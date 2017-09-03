import {NativeModules} from 'react-native';

export default {
	'systemName' : NativeModules.MyDeviceInfo.systemName,
	'systemVersion' : NativeModules.MyDeviceInfo.systemVersion,
	'defaultLanguage' : NativeModules.MyDeviceInfo.deviceLocale,
	'appVersion' : NativeModules.MyDeviceInfo.appVersion
}
