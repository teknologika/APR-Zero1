//
// Lovely Dashboard JavaScript Extensions
// Please drop this file in the 'Simhub/JavascriptExtensions' folder
//

//Bias needs to be in the fomat 53 or 53.7
var PreferredBias = "47";

var BrakeTargetPeakPercentage = 80;
var BrakePeakMaxPercentage = 85;
var BrakeTargetTrailPercentage = 20;
var TrailBrakeTargetAccuracy = 5;

var EnableBrakeGuides = false;
var EnableSimRaceXTargets = true;


function apr_EnableSimRaceXTargets() {
	return EnableSimRaceXTargets;
}


function apr_TargetBrakePercentage() {
	return $prop('TelemetryComparerPlugin.ReferenceLapBrake');
}

function apr_TargetThrottlePercentage() {
		return $prop('TelemetryComparerPlugin.ReferenceLapThrottle');
}

// Which delta to show .. last lap or Session best lap - "Last" or "SessonBest" or "LapRecord"
var DeltaMode = "SessionBest";
var DeltaModeString = "Session Best";



function apr_EnableBrakeGuides(){
	return EnableBrakeGuides;
}

function apr_BrakeTargetPeakPercentage(){
	return BrakeTargetPeakPercentage/100; 
}

function apr_BrakeTargetTrailPercentage(){
	return BrakeTargetTrailPercentage/100; 
}

// 640-(640*[APRDashPlugin.BrakeBarTargetTrailPercentage])

// --- Gauge Specific Functions ---
function apr_BrakebarColor(brakePercentage)
{
	if (EnableBrakeGuides == false)
	{
		return red;
	}

	if (brakePercentage < BrakeTargetTrailPercentage - TrailBrakeTargetAccuracy) {
		return "red";
	}
	else if (brakePercentage < BrakeTargetTrailPercentage + TrailBrakeTargetAccuracy ) {
		return "magenta";
	}
	else if (brakePercentage < BrakeTargetPeakPercentage) {
		return "red";
	}
	else if (brakePercentage <= BrakePeakMax) {
		return "magenta";
	}
	else {
		return "red";
	}
}


function apr_GetSetupBias(){
	var SetupBias = "0.0%";
	if ($prop('GameRawData.SessionData.CarSetup.Chassis.BrakesInCar.BrakePressureBias') != null) {
		SetupBias = $prop('GameRawData.SessionData.CarSetup.Chassis.BrakesInCar.BrakePressureBias');
	}
	else if ($prop('DataCorePlugin.GameRawData.SessionData.CarSetup.BrakesDriveUnit.BrakeSpec.BrakePressureBias') != null){
		SetupBias = $prop('DataCorePlugin.GameRawData.SessionData.CarSetup.BrakesDriveUnit.BrakeSpec.BrakePressureBias');
	}
	else if ($prop('DataCorePlugin.GameRawData.SessionData.CarSetup.Chassis.Front.BrakePressureBias') != null){
		SetupBias = $prop('DataCorePlugin.GameRawData.SessionData.CarSetup.Chassis.Front.BrakePressureBias');
	}
	else if ($prop('DataCorePlugin.GameRawData.SessionData.CarSetup.Chassis.InCarDials.BrakePressureBias') != null){
		SetupBias = $prop('DataCorePlugin.GameRawData.SessionData.CarSetup.Chassis.InCarDials.BrakePressureBias');
	}
	else if ($prop('DataCorePlugin.GameRawData.SessionData.CarSetup.BrakesDriveUnit.BrakeSpec.BrakePressureBias') != null){
		SetupBias = $prop('DataCorePlugin.GameRawData.SessionData.CarSetup.BrakesDriveUnit.BrakeSpec.BrakePressureBias');
	}
	else if ($prop('DataCorePlugin.GameRawData.SessionData.CarSetup.Chassis.General.BrakePressureBias') != null){
		SetupBias = $prop('DataCorePlugin.GameRawData.SessionData.CarSetup.Chassis.General.BrakePressureBias');
	}
	else if ($prop('DataCorePlugin.GameRawData.SessionData.CarSetup.Chassis.BrakesInCarMisc.BrakePressureBias') != null){
		SetupBias = $prop('DataCorePlugin.GameRawData.SessionData.CarSetup.Chassis.BrakesInCarMisc.BrakePressureBias');
	}
	

	return SetupBias;
}

function apr_GetBiasColor(){
		var SetupBrakeBiasPercentage = replace(apr_GetSetupBias(), '%', '');
		var bias = $prop('BrakeBias');
		if (bias == SetupBrakeBiasPercentage) {
			return 'Black';
		}
		else if (bias == PreferredBias) {
			return 'Yellow';
		}
		else {
			return 'White';
		}
}

function apr_GetBiasLabel(){
		var SetupBrakeBiasPercentage = replace(apr_GetSetupBias(), '%', '');
		var bias = $prop('BrakeBias');
		if (bias == SetupBrakeBiasPercentage) {
			return 'Setup';
		}
		else if (bias == PreferredBias) {
			return 'Preferred';
		}
		else {
			return '';
		}
}

function apr_GetSetupTC(){

	var SetupVal = "";

	if ($prop('GameRawData.SessionData.CarSetup.Chassis.BrakesInCar.TcSetting') != null) {
		SetupVal = left($prop('GameRawData.SessionData.CarSetup.Chassis.BrakesInCar.TCSetting'),0,1);
	}
	else if ($prop('DataCorePlugin.GameRawData.SessionData.CarSetup.Chassis.Front.TcSetting') != null){
		SetupVal = left($prop('DataCorePlugin.GameRawData.SessionData.CarSetup.Chassis.Front.TcSetting'),0,1);
	}
	else if ($prop('DataCorePlugin.GameRawData.SessionData.CarSetup.Chassis.InCarDials.TractionControlSetting') != null){
		SetupVal = left($prop('DataCorePlugin.GameRawData.SessionData.CarSetup.Chassis.InCarDials.TractionControlSetting'),0,1);
	}
	return SetupVal;
}

function apr_GetPitWindowMessage(){
	
	// This only works for Road and Oval courses
	// 0 = road, 1-3 = rallycross, 4 = dirt road w/o joker laps, 5-7 = short to long ovals, 8 = dirt oval
	if ($prop('DahlDesign.TrackType') > 0 && $prop('DahlDesign.TrackType') < 5) {
		return "";
	}

	// If the DahlDesign Fuel alert is true, box now
	if ($prop('DahlDesign.FuelAlert') == true) {
		return "BOX";
	}

	// if we need to save to make a stop
    if ( $prop('DahlDesign.FuelConserveToSaveAStop') > 0 && $prop('DahlDesign.FuelConserveToSaveAStop') < 0.15) {
    	return "SAVE";
    }

    // if the pit window is open
	if ($prop('DahlDesign.FuelPitWindowFirst') <= $prop('DataCorePlugin.GameData.CurrentLap') && $prop('DahlDesign.FuelDelta') < 0) {
		return "OPEN";
	}

 	// if we have more fuel than needed, no stops
	if ($prop('DahlDesign.FuelPitStops')  > 0 && $prop('DahlDesign.FuelDelta') >= 0) {
		return "NO PIT";
    }

	return "";
}

function apr_GetPitWindowBackgroundColor(){
	
	// This only works for Road and Oval courses
	// 0 = road, 1-3 = rallycross, 4 = dirt road w/o joker laps, 5-7 = short to long ovals, 8 = dirt oval
	if ($prop('DahlDesign.TrackType') > 0 && $prop('DahlDesign.TrackType') < 5) {
		return "Transparent";
	}

	// If the DahlDesign Fuel alert is true, box now
	if ($prop('DahlDesign.FuelAlert') == true) {
		return "Yellow";
	}

	// if we need to save to make a stop
    if ( $prop('DahlDesign.FuelConserveToSaveAStop') > 0 && $prop('DahlDesign.FuelConserveToSaveAStop') < 0.15) {
    	return "Orange";
    }

    // if the pit window is open
	if ($prop('DahlDesign.FuelPitWindowFirst') <= $prop('DataCorePlugin.GameData.CurrentLap') && $prop('DahlDesign.FuelDelta') < 0) {
		return "LawnGreen";
	}

 	// if we have more fuel than needed, no stops
	if ($prop('DahlDesign.FuelPitStops')  > 0 && $prop('DahlDesign.FuelDelta') >= 0) {
		return "Grey";
    }

    // Default Dark Grey Colour
	return "#FF262626";
}

function apr_GetPitWindowTextColor(){
	
	// This only works for Road and Oval courses
	// 0 = road, 1-3 = rallycross, 4 = dirt road w/o joker laps, 5-7 = short to long ovals, 8 = dirt oval
	if ($prop('DahlDesign.TrackType') > 0 && $prop('DahlDesign.TrackType') < 5) {
		return "Transparent";
	}

	// If the DahlDesign Fuel alert is true, box now
	if ($prop('DahlDesign.FuelAlert') == true) {
		return "Black";
	}

	// if we need to save to make a stop
    if ( $prop('DahlDesign.FuelConserveToSaveAStop') > 0 && $prop('DahlDesign.FuelConserveToSaveAStop') < 0.15) {
    	return "Black";
    }

    // // if the pit window is open
	if ($prop('DahlDesign.FuelPitWindowFirst') <= $prop('DataCorePlugin.GameData.CurrentLap') && $prop('DahlDesign.FuelDelta') < 0) {
		return "Black";
	}

 	// if we have more fuel than needed, no stops
	if ($prop('DahlDesign.FuelPitStops')  > 0 && $prop('DahlDesign.FuelDelta') >= 0) {
		return "Black";
    }

    // Default Dark Grey Colour
	return "#FF262626";
}

function apr_getDeltaChange(){
	if (DeltaMode == "SessionBest") {
		return $prop('DahlDesign.DeltaSessionBestChange');
	}
	if (DeltaMode == "LapRecord") {
		return $prop('DahlDesign.DeltaLapRecordChange');
	}
	return $prop('DahlDesign.DeltaLastLapChange');
}

function apr_getDeltaChange_start_value(){
	var raw = $prop('DahlDesign.DeltaLastLapChange');

	if (DeltaMode == "SessionBest") {
		raw = $prop('DahlDesign.DeltaSessionBestChange');
	}
	if (DeltaMode == "LapRecord") {
		raw =  $prop('DahlDesign.DeltaLapRecordChange');
	}
	var segment = raw.split(",");
	var segments = (segment[0]*1+segment[1]*1+segment[2]*1+segment[3]*1+segment[4]*1+segment[5]*1+segment[6]*1)/7;
	return segments;
}

function apr_getDeltaChange_mid_value(){
	var raw = $prop('DahlDesign.DeltaLastLapChange');

	if (DeltaMode == "SessionBest") {
		raw = $prop('DahlDesign.DeltaSessionBestChange');
	}
	if (DeltaMode == "LapRecord") {
		raw =  $prop('DahlDesign.DeltaLapRecordChange');
	}
	var segment = raw.split(",");
	var segments = (segment[7]*1+segment[8]*1+segment[9]*1+segment[10]*1+segment[11]*1+segment[12]*1)/6;
	return segments;
}

function apr_getDeltaChange_end_value(){
	if (DeltaMode == "SessionBest") {
		raw = $prop('DahlDesign.DeltaSessionBestChange');
	}
	if (DeltaMode == "LapRecord") {
		raw =  $prop('DahlDesign.DeltaLapRecordChange');
	}
	var segment = raw.split(",");
	var segments = (segment[13]*1+segment[14]*1+segment[15]*1+segment[16]*1+segment[17]*1+segment[18]*1+segment[19]*1)/7;
	return segments;
}

function apr_getDeltaValue(){

	if($prop('IsInPit') == true)
	{
		return "PIT";
	}

	if($prop('DahlDesign.LapStatus') == 3)
	{
		return "OUT";
	}

	if (Math.abs($prop('DahlDesign.DeltaSessionBest')) > 100 || $prop('DahlDesign.DeltaSessionBest') == 0)
	{
		return "-";
	}

	if (DeltaMode == "SessionBest") {
		return format($prop('DahlDesign.DeltaSessionBest'),'0.00',1);
	}

	if (DeltaMode == "LapRecord") {
		return format($prop('DahlDesign.DeltaLapRecord'),'0.00',1);
	}

	return format($prop('DahlDesign.DeltaLastLap'),'0.00',1);
}

function apr_getDeltaMode() {
	return DeltaMode;
}

function apr_getDeltaModeString() {
	return DeltaModeString;
}

	// Do do switch this based on selection
function apr_Sector1_Delta_time() {
	var deltaVal =  timespantoseconds($prop('DahlDesign.CurrentSector1Time')) - timespantoseconds($prop('DahlDesign.Lap01Sector1Time')) 
	return deltaVal;
}

function apr_Sector2_Delta_time() {
	var deltaVal =  timespantoseconds($prop('DahlDesign.CurrentSector2Time')) - timespantoseconds($prop('DahlDesign.Lap01Sector2Time')) 
	return deltaVal;
}

function apr_Sector3_Delta_time() {
	var deltaVal =  timespantoseconds($prop('DahlDesign.CurrentSector3Time')) - timespantoseconds($prop('DahlDesign.Lap01Sector3Time')) 
	return deltaVal;
}

function apr_Sector1_pace_color() {
	// if the current sector is 1, return transparent
	if ($prop('DahlDesign.CurrentSector') == 1) {
		return 'transparent';
	}
	var deltaVal = apr_Sector1_Delta_time();

	// if the current sector is faster
	if (deltaVal == 0) {
		return 'fuschia';
	}

	// if the current sector is faster
	if (deltaVal < 0) {
		return 'lime';
	}

	// if the current sector is faster
	if (deltaVal > 0) {
		return 'red';
	}

	return 'transparent';
}

function apr_Sector1_text_color() {
	// if the current sector is 1, return transparent
	if ($prop('DahlDesign.CurrentSector') == 1) {
		return 'transparent';
	}
	var deltaVal = apr_Sector1_Delta_time();

	// if the current sector is faster
	if (deltaVal == 0) {
		return 'white';
	}

	// if the current sector is faster
	if (deltaVal < 0) {
		return 'black';
	}

	// if the current sector is faster
	if (deltaVal > 0) {
		return 'white';
	}

	return 'transparent';
}


function apr_Sector2_pace_color() {
	// if the current sector is 1, return transparent
	if ($prop('DahlDesign.CurrentSector') == 2) {
		return 'transparent';
	}

	var deltaVal = apr_Sector2_Delta_time();

	if (deltaVal == 0) {
		return 'fuschia';
	}

	// if the current sector is faster
	if (deltaVal < 0) {
		return 'lime';
	}

	// if the current sector is faster
	if (deltaVal > 0) {
		return 'red';
	}

	return 'transparent';
}

function apr_Sector2_text_color() {
	// if the current sector is 1, return transparent
	if ($prop('DahlDesign.CurrentSector') == 2) {
		return 'transparent';
	}
	var deltaVal = apr_Sector2_Delta_time();

	// if the current sector is faster
	if (deltaVal == 0) {
		return 'white';
	}

	// if the current sector is faster
	if (deltaVal < 0) {
		return 'black';
	}

	// if the current sector is faster
	if (deltaVal > 0) {
		return 'white';
	}

	return 'transparent';
}

function apr_Sector3_pace_color() {
	// if the current sector is 1, return transparent
	if ($prop('DahlDesign.CurrentSector') == 3) {
		return 'transparent';
	}
	
	var deltaVal = apr_Sector3_Delta_time();

	// if the current sector is faster
	if (deltaVal == 0) {
		return 'fuschia';
	}

	// if the current sector is faster
	if (deltaVal < 0) {
		return 'lime';
	}

	// if the current sector is faster
	if (deltaVal > 0) {
		return 'red';
	}

	return 'transparent';
}


function apr_Sector3_text_color() {
	// if the current sector is 3, return transparent
	if ($prop('DahlDesign.CurrentSector') == 3) {
		return 'transparent';
	}
	var deltaVal = apr_Sector3_Delta_time();

	// if the current sector is faster
	if (deltaVal == 0) {
		return 'white';
	}

	// if the current sector is faster
	if (deltaVal < 0) {
		return 'black';
	}

	// if the current sector is faster
	if (deltaVal > 0) {
		return 'white';
	}

	return 'transparent';
}



// Sectors

var sectorsWidth = 310;

function apr_sectorCount() {
    return $prop('DataCorePlugin.GameData.SectorsCount');
}

function apr_sectorSegmentWidth(sector) {
    if ( sector == apr_sectorCount() ) {
        return sectorsWidth / apr_sectorCount();
    } else {
        return sectorsWidth / apr_sectorCount() - 1;
    }
}

function apr_sectorSegmentPos(sector) {
    return (sectorsWidth / apr_sectorCount() ) * (sector-1);
}


function apr_sectorSegmentColor(sector) {
    var timeDiff = timespantoseconds( currentlapgetsectortime(sector, false) ) - 
                timespantoseconds( bestsectortime(sector, false) );
    var timeDiffOverall = timespantoseconds( currentlapgetsectortime(sector, false) ) - 
                timespantoseconds( getbestsplittime(sector) );
    if (sector >= $prop('DataCorePlugin.GameData.CurrentSectorIndex') ) {
        return 'yellow';
    } else if ( timeDiffOverall <= 0 ) {
		return 'fuschia';
    } else if (timeDiff <= 0) {
        return 'lime';
    } else {
		return 'red';
    }
}
function apr_sectorLastSegmentColor(sector) {
    var timeDiff = timespantoseconds( lastlapgetsectortime(sector, false) ) - 
                timespantoseconds( bestsectortime(sector, false) );
    var timeDiffOverall = timespantoseconds( lastlapgetsectortime(sector, false) ) - 
                timespantoseconds( getbestsplittime(sector) );
    if ( timeDiffOverall == 0 ) {
		return 'fuschia';
    } else if (timeDiff <= 0) {
        return 'lime';
    } else {
        return 'red';
    }
}

function apr_driverSectorSegmentColor(driver, sector) {
    var timeDiff = timespantoseconds( driversectorcurrentlap( driver, sector, false) ) - 
                    timespantoseconds( driversectorbest( driver, sector, false) );
    var timeDiffOverall = timespantoseconds( driversectorcurrentlap( driver, sector, false) ) - 
                timespantoseconds( getbestsplittime( sector ) );
    if (sector >= drivercurrentsector( driver ) ) {
        return 'yellow';
    } else if ( timeDiffOverall <= 0 ) {
		return 'fuschia';
    } else if (timeDiff <= 0) {
        return 'lime';
    } else {
        return 'red';
    }
}