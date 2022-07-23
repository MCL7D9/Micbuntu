function Com_Sys () {
	
}
function Command () {
    OLED.clear()
    Progress_Name = "command"
    OLED.writeStringNewLine("Enter Command Mode")
    OLED.drawLine(
    0,
    10,
    128,
    10
    )
}
WiFiIoT.on_wifi_connect(function (IP_Address, Device_ID) {
    OLED.clear()
    OLED.writeStringNewLine("WiFi Connected")
    OLED.writeStringNewLine("Device ID:" + Device_ID)
})
function Counter () {
    OLED.clear()
    Progress_Name = "counter"
    OLED.writeStringNewLine("Press A To Add A Value")
    OLED.writeStringNewLine("Press B To Add B Value")
}
WiFiIoT.on_wifi_received_value(function (Channel, receivedMessage, Value) {
    if (Progress_Name == "counter") {
        if (receivedMessage == "M1_CA") {
            OLED.writeString("Other A Value:" + Value)
        }
        if (receivedMessage == "M1_CB") {
            OLED.writeString("Other B Value:" + Value)
        }
    }
})
input.onButtonPressed(Button.A, function () {
    if (Progress == 1) {
        Counter()
        Progress += 1
    }
    if (Progress == 2) {
        Progress_Name = "com_net"
        Progress += 1
    }
    if (Progress_Name == "counter") {
        A_Count += 1
        OLED.clear()
        WiFiIoT.wifi_send_message_value("D", "M0_CA", A_Count)
        OLED.writeStringNewLine("Enter Counter Mode")
        OLED.writeStringNewLine("A Value:" + A_Count)
        OLED.writeStringNewLine("B Value:" + B_Count)
    }
})
WiFiIoT.on_WAN_remote(function (WAN_Command) {
    if (Progress_Name == "command") {
        OLED.clear()
        OLED.writeStringNewLine("Command:" + WAN_Command)
        if (WAN_Command == "light_on") {
            SmartCity.turn_white_led(1023, AnalogPin.P0)
        }
        if (WAN_Command == "light_off") {
            SmartCity.turn_white_led(0, AnalogPin.P0)
        }
    }
})
input.onGesture(Gesture.Shake, function () {
    if (Progress > 1) {
        Progress += -1
        if (Progress == 1) {
            Setup()
        } else if (Progress == 2) {
        	
        } else {
        	
        }
    }
})
function init () {
    OLED.clear()
    OLED.init(128, 64)
    WiFiIoT.initializeWifi(SerialPin.P16, SerialPin.P8)
    WiFiIoT.wifi_listen_channel("D")
    WiFiIoT.setWifi("ASUS_MMLC2_2G", "smartcity")
    basic.clearScreen()
    B_Count = 0
    B_Count = 0
    Progress = 0
    Now_Time = 1800
    list = [18, 0, 0]
    Progress_Name = "init"
    Setup()
}
function Setup () {
    OLED.clear()
    Progress = 1
    Progress_Name = "setup"
    OLED.writeStringNewLine("Micbuntu OS Alpha2.2")
    OLED.writeStringNewLine("INIT Successfully")
    OLED.writeStringNewLine("Enter Counter Mode, Press A")
    OLED.writeStringNewLine("Enter IFTTT Mode, Press B")
    OLED.writeStringNewLine("Shake Microbit To Back To Preceding Menu")
}
input.onButtonPressed(Button.B, function () {
    if (Progress == 1) {
        Command()
        Progress_Name = "command"
        Progress += 1
    }
    if (Progress_Name == "counter") {
        B_Count += 1
        OLED.clear()
        WiFiIoT.wifi_send_message_value("D", "M0_CB", B_Count)
        OLED.writeStringNewLine("Enter Counter Mode")
        OLED.writeStringNewLine("A Value:" + A_Count)
        OLED.writeStringNewLine("B Value:" + B_Count)
    }
})
WiFiIoT.on_WAN_remote_value(function (WAN_Command, Value) {
    if (Progress_Name == "command") {
        OLED.clear()
        OLED.writeStringNewLine("Command:" + WAN_Command + " Value:" + Value)
        if (WAN_Command == "light_brightness") {
            SmartCity.turn_white_led(Value, AnalogPin.P0)
        }
    }
})
let list: number[] = []
let Now_Time = 0
let B_Count = 0
let A_Count = 0
let Progress = 0
let Progress_Name = ""
init()
loops.everyInterval(1000, function () {
    list[2] = list[2] + 1
    if (list[2] == 60) {
        list[2] = 0
        list[1] = list[1] + 1
    }
    if (list[1] == 60) {
        list[1] = 0
        list[0] = list[0] + 1
    }
    Now_Time = list[0]
})
basic.forever(function () {
	
})
