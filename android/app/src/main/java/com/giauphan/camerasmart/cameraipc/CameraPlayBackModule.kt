package com.giauphan.camerasmart.cameraipc

import com.facebook.react.bridge.*
import com.thingclips.smart.camera.middleware.p2p.IThingSmartCameraP2P
import com.thingclips.smart.camera.camerasdk.thingplayer.callback.OperationDelegateCallBack
import com.giauphan.camerasmart.cameraipc.bean.TimePieceBean
import com.giauphan.camerasmart.cameraipc.bean.RecordInfoBean
import com.google.gson.Gson
import com.thingclips.smart.android.camera.sdk.ThingIPCSdk
import android.util.Log 

class CameraPlayBackModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private lateinit var mCameraP2P: IThingSmartCameraP2P<Any>
    
    private var mBackDataDayCache: MutableMap<String, MutableList<TimePieceBean>> = mutableMapOf()
    private var mBackDataMonthCache: MutableMap<String, MutableList<String>> = mutableMapOf()

    override fun getName(): String {
        return "CameraPlayBackModule"
    }

    @ReactMethod
    fun getVideoPlayBack(devId: String, date: String, promise: Promise) {
        val parts = date.split("-")
        val year = parts[0].toInt()
        val month = parts[1].toInt()
        val day = parts[2].toInt()

        promise.reject("tag_video", "Error message: $devId $date")
        
        val connectDevice = initCameraP2P(devId, promise)

        if(connectDevice){
            mCameraP2P.queryRecordTimeSliceByDay(year, month, day, object : OperationDelegateCallBack {
                    override fun onSuccess(sessionId: Int, requestId: Int, data: String) {
                        try {
                            parsePlaybackData(data, promise)
                        } catch (e: Exception) {
                            promise.reject("PLAYBACK_ERROR", "Error parsePlaybackData playback data", e)
                        }
                    }

                    override fun onFailure(sessionId: Int, requestId: Int, errCode: Int) {
                        promise.reject("PLAYBACK_ERROR", "Failed to retrieve playback data")
                    }
            })
        } else {
            promise.reject("connectDevice", "Failed to retrieve $connectDevice")
        }

    }

    private fun parsePlaybackData(obj: Any, promise: Promise) {
        val recordInfoBean = Gson().fromJson(obj.toString(), RecordInfoBean::class.java)
        val timePieceBeanList = recordInfoBean.items
        if (recordInfoBean.count != 0 && !timePieceBeanList.isNullOrEmpty()) {
            mBackDataDayCache[mCameraP2P.dayKey] = timePieceBeanList
        }
        handleDataDate(promise)
    }

    private fun handleDataDate(promise: Promise) {
        val days = mBackDataMonthCache[mCameraP2P.monthKey]
        if (days.isNullOrEmpty()) {
            promise.reject("NO_DATA", "No data available for the selected date")
            return
        }

        val formattedDates = mutableListOf<String>()
        for (day in days) {
            val formattedDate = "$day-${mCameraP2P.monthKey}"
            formattedDates.add(formattedDate)
        }

        promise.resolve(formattedDates)
    }


    private fun initCameraP2P(devId: String, promise: Promise): Boolean {
        try {
            mBackDataMonthCache.clear()
            mBackDataDayCache.clear()

            val cameraInstance = ThingIPCSdk.getCameraInstance()
            promise.reject("cameraInstance", "log $cameraInstance")

            if (cameraInstance != null) {
                mCameraP2P = cameraInstance.createCameraP2P(devId)
                if (!mCameraP2P.isConnecting) {
                    mCameraP2P.connect(devId, object : OperationDelegateCallBack {
                        override fun onSuccess(sessionId: Int, requestId: Int, data: String) {
                            promise.reject("CameraP2P_DATA", "P2P connect success")
                        }

                        override fun onFailure(sessionId: Int, requestId: Int, errCode: Int) {
                            promise.reject("CameraP2P_DATA", "P2P connect failed")
                        }
                    })
                }
                return true
            } else {
                return false
            }
        } catch (e: Exception) {
            promise.reject("CameraP2P_DATA", "Error initializing camera data", e)
            return false
        }
    }
}
