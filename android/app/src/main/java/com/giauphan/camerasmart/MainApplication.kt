package com.giauphan.camerasmart

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.flipper.ReactNativeFlipper
import com.facebook.soloader.SoLoader
import com.thingclips.smart.home.sdk.ThingHomeSdk
import com.giauphan.camerasmart.MyAppPackage
import android.util.Log 
import android.content.ComponentName
import android.content.pm.PackageManager

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
      override fun getPackages(): List<ReactPackage> =
        PackageList(this).packages.apply {
        add(MyAppPackage())
    }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(this.applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }
    ReactNativeFlipper.initializeFlipper(this, reactNativeHost.reactInstanceManager)

    val appkey = getMetaDataValue("THING_SMART_APPKEY")
    val appSerect = getMetaDataValue("THING_SMART_SECRET")

    try {
      ThingHomeSdk.setDebugMode(true);
      ThingHomeSdk.init(this,appkey,appSerect)
       Log.d("TAG", "Connect success")
    }
    catch(e:Exception) {
      Log.e("TAG", "Error message: $e")
    }
    
  }

    private fun getMetaDataValue(key: String): String {
      var value = ""
      try {
          val ai = packageManager.getActivityInfo(ComponentName(this, MainActivity::class.java), PackageManager.GET_META_DATA)
          val bundle = ai.metaData
          value = bundle.getString(key) ?: ""
      } catch (e: PackageManager.NameNotFoundException) {
          e.printStackTrace()
      }
      return value
  }

}
