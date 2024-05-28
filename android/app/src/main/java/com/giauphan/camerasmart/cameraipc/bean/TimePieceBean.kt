package com.giauphan.camerasmart.cameraipc.bean

import kotlin.Comparable


data class TimePieceBean(
    val startTime: Int,
    val endTime: Int,
    val playTime: Int,
    val prefix: Int
) : Comparable<TimePieceBean> {
    override fun compareTo(other: TimePieceBean): Int {
        return if (endTime >= other.endTime) 1 else -1
    }

    override fun toString(): String {
        return "TimePieceBean(startTime=$startTime, endTime=$endTime, playTime=$playTime, prefix=$prefix)"
    }
}