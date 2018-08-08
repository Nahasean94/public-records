pragma solidity ^0.4.22;

contract PublicRecords {
    address public owner;

    struct Institution {
        uint256 timestamp;
        bytes32 name;
        bytes32 dateFounded;
        bytes32 county;
        bytes32 category;
        bool exists;
    }

    event AddedInstitution(
        uint256 timestamp,
        bytes32 name,
        bytes32 dateFounded,
        bytes32 county,
        bytes32 category);

    mapping(bytes32 => Institution) institutions;

    struct ECDERecord {
        uint256 timestamp;
        bytes32 upi;
        uint256 english;
        uint256 kiswahili;
        uint256 math;
        bytes32 date;
        bytes32 institution;
        bool repeater;
        bool exists;

    }

    event AddedECDERecord(
        uint256 timestamp,
        bytes32 upi,
        uint256 english,
        uint256 kiswahili,
        uint256 math,
        bytes32 date,
        bytes32 institution
    );
    //
    mapping(bytes32 => ECDERecord) ecdeRecords;

    struct PrimarySchoolRecord {
        uint256 timestamp;
        bytes32 upi;
        uint256 english;
        uint256 kiswahili;
        uint256 math;
        uint256 science;
        uint256 socialStudies;
        bytes32 date;
        bytes32 institution;
        bool repeater;
        bool exists;
    }

    event AddedPrimarySchoolRecord(
        uint256 timestamp,
        bytes32 upi,
        uint256 english,
        uint256 kiswahili,
        uint256 math,
        uint256 science,
        uint256 socialStudies,
        bytes32 date,
        bytes32 institution
    );

    mapping(bytes32 => PrimarySchoolRecord) primarySchoolRecords;

    struct SecondarySchoolRecord {
        uint256 timestamp;
        bytes32 upi;
        uint256 english;
        uint256 kiswahili;
        uint256 math;
        uint256 biology;
        uint256 chemistry;
        uint256 physics;
        uint256 history;
        uint256 geography;
        uint256 religion;
        uint256 business;
        bytes32 date;
        bytes32 institution;
        bool repeater;
        bool exists;
    }

    event AddedSecondarySchoolRecord(
        uint256 timestamp,
        bytes32 upi,
        uint256 english,
        uint256 kiswahili,
        uint256 math,
        uint256 biology,
        uint256 chemistry,
        uint256 physics,
        uint256 history,
        uint256 geography,
        uint256 religion,
        uint256 business,
        bytes32 date,
        bytes32 institution
    );

    mapping(bytes32 => SecondarySchoolRecord) secondarySchools;

    struct UndergraduateRecord {
        uint256 timestamp;
        bytes32 upi;
        bytes32 programme;
        bytes32 grade;
        bytes32 date;
        bytes32 institution;
        bool exists;
    }

    event AddedUndergraduateRecord(
        uint256 timestamp,
        bytes32 upi,
        bytes32 programme,
        bytes32 grade,
        bytes32 date,
        bytes32 institution
    );

    mapping(bytes32 => UndergraduateRecord) undergraduateRecords;

    struct TitleDeed {
        uint256 title_number;
        uint256 approximate_area;
        uint256 registry;
        bytes32 names;
        bytes32 postal_address;
        bytes32 district;
        bytes32 date;
        bool exists;
    }

    event AddedTitleDeed(
        uint256 full_names,
        uint256 approximate_area,
        uint256 registry,
        bytes32 names,
        bytes32 postal_address,
        bytes32 district
    );

    mapping(uint256 => TitleDeed) titledeeds;

    struct DrivingLicense {
        uint256 nationalID;
        bytes32 dob;
        bytes32[] vehicle_classes;
        bytes32 names;
        bytes32 postal_address;
        bytes32 expiry;
        bytes32 date_of_issue;
        bool exists;
    }

    event AddedDrivingLicense(
        uint256 nationalID,
        bytes32 dob,
        bytes32 names,
        bytes32 postal_address,
        bytes32 expiry
    );

    mapping(uint256 => DrivingLicense) drivingLicenses;

    struct Logbook {
        bytes32 entry_number;
        bytes32 car_number;
        bytes32 chassis;
        bytes32 make;
        bytes32 model;
        bytes32 car_type;
        bytes32 body;
        bytes32 fuel;
        bytes32 manufacture_year;
        uint256 rating;
        bytes32 engine_number;
        bytes32 color;
        bytes32 registration_date;
        bytes32 duty;
        bytes32 passengers;
        uint256 tare_weight;
        bytes32 tax_class;
        uint256 axles;
        bytes32 previous_reg_country;
        bytes32 kra_pin;
        bytes32 full_names;
        bytes32 postal_address;
        bool exists;
    }

    event AddedLogbook(
        bytes32 entry_number,
        bytes32 car_number,
        bytes32 chasis,
        bytes32 make,
        bytes32 model,
        bytes32 car_type
    );

    mapping(bytes32 => Logbook) logbooks;

    constructor() public {
        if (msg.sender == owner) selfdestruct(owner);
    }

    function kill() public {
        selfdestruct(owner);
    }

    function getAddress() public constant returns (address){
        return msg.sender;
    }
    //add an institution
    function addInstitution(
        bytes32 name,
        bytes32 dateFounded,
        bytes32 county,
        bytes32 upi,
        bytes32 category
    ) public {
        require(!isInstitutionExists(upi));

        institutions[upi] = Institution(now, name, dateFounded, county, category, true);
        emit AddedInstitution(now, name, dateFounded, county, category);

    }
    //get an institution
    function getInstitution(bytes32 upi) public constant returns (uint256, bytes32, bytes32, bytes32, bytes32, bytes32){
        require(isInstitutionExists(upi));
        //        Institution memory institution=institutions[upi];
        return (
        institutions[upi].timestamp,
        institutions[upi].name,
        institutions[upi].dateFounded,
        institutions[upi].county,
        institutions[upi].category,
        upi
        );

    }
    //is institution exist
    function isInstitutionExists(bytes32 upi) private constant returns (bool){
        if (institutions[upi].exists) {
            return true;
        }
        return false;
    }
    //add an ECDE Record
    function addECDERecord(
        bytes32 upi,
        uint256 english,
        uint256 kiswahili,
        uint256 math,
        bytes32 date,
        bytes32 institution
    ) public {
        require(!isECDERecordExists(upi));
        ecdeRecords[upi] = ECDERecord(now, upi, english, kiswahili, math, date, institution, false, true);
        emit AddedECDERecord(now, upi, english, kiswahili, math, date, institution);
    }


    //get an ECDE Record
    function getECDERecord(bytes32 upi) public constant returns (uint256, bytes32, uint256, uint256, uint256, bytes32, bytes32){
        require(isECDERecordExists(upi));
        return (
        ecdeRecords[upi].timestamp,
        ecdeRecords[upi].upi,
        ecdeRecords[upi].english,
        ecdeRecords[upi].kiswahili,
        ecdeRecords[upi].math,
        ecdeRecords[upi].date,
        ecdeRecords[upi].institution);

    }
    //is ECDE record exist
    function isECDERecordExists(bytes32 upi) private constant returns (bool){
        if (ecdeRecords[upi].exists) {
            return true;
        }
        return false;
    }
    //add a Primary School Record
    function addPrimarySchoolRecord(
        bytes32 upi,
        uint256 english,
        uint256 kiswahili,
        uint256 math,
        uint256 science,
        uint256 socialStudies,
        bytes32 date,
        bytes32 institution

    ) public {
        require(!isPrimarySchoolRecordExists(upi));
        primarySchoolRecords[upi] = PrimarySchoolRecord(now, upi, english, kiswahili, math, science, socialStudies, date, institution, false, true);
        emit AddedPrimarySchoolRecord(now, upi, english, kiswahili, math, science, socialStudies, date, institution);
    }

    //get a Primary School Record
    function getPrimarySchoolInfo(bytes32 upi) public constant returns (uint256, bytes32, bytes32, bytes32){
        require(isPrimarySchoolRecordExists(upi));
        return (
        primarySchoolRecords[upi].timestamp,
        primarySchoolRecords[upi].upi,
        primarySchoolRecords[upi].date,
        primarySchoolRecords[upi].institution);

    }
    //get primary school subjects
    function getPrimarySchoolSubjects(bytes32 upi) public constant returns (uint256, uint256, uint256, uint256, uint){
        require(isPrimarySchoolRecordExists(upi));
        return (
        primarySchoolRecords[upi].english,
        primarySchoolRecords[upi].kiswahili,
        primarySchoolRecords[upi].math,
        primarySchoolRecords[upi].science,
        primarySchoolRecords[upi].socialStudies
        );

    }
    //is Primary school record exist
    function isPrimarySchoolRecordExists(bytes32 upi) private constant returns (bool){
        if (primarySchoolRecords[upi].exists) {
            return true;
        }
        return false;
    }
    //add Secondary school
    function addSecondarySchoolRecord(
        bytes32 upi,
        uint256 english,
        uint256 kiswahili,
        uint256 math,
        uint256 biology,
        uint256 chemistry,
        uint256 physics,
        uint256 history,
        uint256 geography,
        uint256 religion,
        uint256 business,
        bytes32 date,
        bytes32 institution
    ) public {
        require(!isSecondarySchoolRecordExists(upi));
        secondarySchools[upi] = SecondarySchoolRecord(
            now,
            upi,
            english,
            kiswahili,
            math,
            biology,
            chemistry,
            physics,
            history,
            geography,
            religion,
            business,
            date,
            institution,
            false,
            true
        );
        emit AddedSecondarySchoolRecord(
            now,
            upi,
            english,
            kiswahili,
            math,
            biology,
            chemistry,
            physics,
            history,
            geography,
            religion,
            business,
            date,
            institution);
    }


    //get SecondarySchoolInfo
    function getSecondarySchoolInfo(bytes32 upi) public constant returns (uint256, bytes32, bytes32, bytes32){
        require(isSecondarySchoolRecordExists(upi));
        return (
        secondarySchools[upi].timestamp,
        secondarySchools[upi].upi,
        secondarySchools[upi].date,
        secondarySchools[upi].institution);
    }
    //get Humanities
    function getHumanitites(bytes32 upi) public constant returns (uint256, uint256, uint){
        require(isSecondarySchoolRecordExists(upi));
        return (
        secondarySchools[upi].history,
        secondarySchools[upi].religion,
        secondarySchools[upi].geography);
    }
    //get Core subjects
    function getCoreSubjects(bytes32 upi) public constant returns (uint256, uint256, uint){
        require(isSecondarySchoolRecordExists(upi));
        return (
        secondarySchools[upi].english,
        secondarySchools[upi].kiswahili,
        secondarySchools[upi].math);
    }
    //get sciences
    function getSciences(bytes32 upi) public constant returns (uint256, uint256, uint){
        require(isSecondarySchoolRecordExists(upi));
        return (
        secondarySchools[upi].biology,
        secondarySchools[upi].chemistry,
        secondarySchools[upi].physics);
    }
    //get electives
    function getElectives(bytes32 upi) public constant returns (uint){
        require(isSecondarySchoolRecordExists(upi));
        return (
        secondarySchools[upi].business);
    }

    //is Secondary schoool record exist
    function isSecondarySchoolRecordExists(bytes32 upi) private constant returns (bool){
        if (secondarySchools[upi].exists) {
            return true;
        }
        return false;
    }
    //add an Undergraduate record
    function addUndergraduateRecord(
        bytes32 upi,
        bytes32 programme,
        bytes32 grade,
        bytes32 date,
        bytes32 institution
    ) public {
        require(!isUndergraduateRecordExists(upi));
        undergraduateRecords[upi] = UndergraduateRecord(now, upi, programme, grade, date, institution, true);
        emit AddedUndergraduateRecord(now, upi, programme, grade, date, institution);
    }
    //get an Undergraduate record
    function getUndergraduateRecord(bytes32 upi) public constant returns (uint256, bytes32, bytes32, bytes32, bytes32, bytes32){
        require(isUndergraduateRecordExists(upi));
        return (
        undergraduateRecords[upi].timestamp,
        undergraduateRecords[upi].upi,
        undergraduateRecords[upi].programme,
        undergraduateRecords[upi].grade,
        undergraduateRecords[upi].date,
        undergraduateRecords[upi].institution);

    }
    //is Undergraduate record exist
    function isUndergraduateRecordExists(bytes32 upi) private constant returns (bool){
        if (undergraduateRecords[upi].exists) {
            return true;
        }
        return false;
    }
//    //add Logbook record
//    function addUndergraduateRecord(
//        bytes32 entry_number,
//        bytes32 car_number,
//        bytes32 chassis,
//        bytes32 make,
//        bytes32 model,
//        bytes32 car_type,
//        bytes32 body,
//        bytes32 fuel,
//        bytes32 manufacture_year,
//        uint256 rating,
//        bytes32 engine_number,
//        bytes32 color,
//        bytes32 registration_date,
//        bytes32 duty,
//        bytes32 passengers,
//        uint256 tare_weight,
//        bytes32 tax_class,
//        uint256 axles,
//        bytes32 previous_reg_country,
//        bytes32 kra_pin,
//        bytes32 full_names,
//        bytes32 postal_address
//    ) public {
//        require(!isLogbookExists(car_number));
//        logbooks[car_number] = Logbook(entry_number,
//            car_number,
//            chassis,
//            make,
//            model,
//            car_type,
//            body,
//            fuel,
//            manufacture_year,
//            rating,
//            engine_number,
//            color,
//            registration_date,
//            duty,
//            passengers,
//            tare_weight,
//            tax_class,
//            axles,
//            previous_reg_country,
//            kra_pin,
//            full_names,
//            postal_address,
//            true);
//        emit AddedLogbook(
//            entry_number,
//            car_number,
//            chassis,
//            make,
//            model,
//            car_type
//        );
//    }
    /***
    Divide the logbook details into parts of 6 variables each
    **/
    //return part A
    function getLogbookA(bytes32 car_number) public constant returns (bytes32, bytes32, bytes32, bytes32, bytes32, bytes32){
        require(isLogbookExists(car_number));
        return (
        logbooks[car_number].entry_number,
        logbooks[car_number].car_number,
        logbooks[car_number].chassis,
        logbooks[car_number].make,
        logbooks[car_number].model,
        logbooks[car_number].car_type
        );

    }
    //return part B
    function getLogbookB(bytes32 car_number) public constant returns (bytes32, bytes32, bytes32, uint256, bytes32, bytes32){
        require(isLogbookExists(car_number));
        return (
        logbooks[car_number].body,
        logbooks[car_number].fuel,
        logbooks[car_number].manufacture_year,
        logbooks[car_number].rating,
        logbooks[car_number].engine_number,
        logbooks[car_number].color
        );

    }
    //return part C
    function getLogbookC(bytes32 car_number) public constant returns (bytes32, bytes32, uint256, bytes32, uint256, bytes32){
        require(isLogbookExists(car_number));
        return (
        logbooks[car_number].registration_date,
        logbooks[car_number].duty,
        logbooks[car_number].tare_weight,
        logbooks[car_number].tax_class,
        logbooks[car_number].axles,
        logbooks[car_number].previous_reg_country
        );

    }
    //return logbook owner
    function getLogbookOwner(bytes32 car_number) public constant returns (bytes32, bytes32, bytes32){
        require(isLogbookExists(car_number));
        return (
        logbooks[car_number].kra_pin,
        logbooks[car_number].full_names,
        logbooks[car_number].postal_address
        );

    }
    //is Undergraduate record exist
    function isLogbookExists(bytes32 car_number) private constant returns (bool){
        if (logbooks[car_number].exists) {
            return true;
        }
        return false;
    }

    //add a title deed
    function addTitleDeed(
        uint256 title_number,
        uint256 approximate_area,
        uint256 registry,
        bytes32 names,
        bytes32 postal_address,
        bytes32 district,
        bytes32 date
    ) public {
        require(!isTitleDeedExists(title_number));
        titledeeds[title_number] = TitleDeed(
            title_number,
            approximate_area,
            registry,
            names,
            postal_address,
            district,
            date,
            true);
        emit AddedTitleDeed(
            title_number,
            approximate_area,
            registry,
            names,
            postal_address,
            district);
    }
    //get a title deed
    function getTitleDeed(uint256 title_number) public constant returns (uint256, uint256, uint256, bytes32){
        require(isTitleDeedExists(title_number));
        return (
        titledeeds[title_number].title_number,
        titledeeds[title_number].approximate_area,
        titledeeds[title_number].registry,
        titledeeds[title_number].date);

    }
    //get a title deed owner
    function getTitleDeedOwner(uint256 title_number) public constant returns (bytes32, bytes32, bytes32){
        require(isTitleDeedExists(title_number));
        return (
        titledeeds[title_number].names,
        titledeeds[title_number].postal_address,
        titledeeds[title_number].district);


    }
    //is Title deed record exist
    function isTitleDeedExists(uint256 title_number) private constant returns (bool){
        if (titledeeds[title_number].exists) {
            return true;
        }
        return false;
    }

    //add a driving license
    function addDrivingLicense(
        uint256 nationalID,
        bytes32 dob,
        bytes32[] vehicle_classes,
        bytes32 names,
        bytes32 postal_address,
        bytes32 expiry,
        bytes32 date_of_issue
    ) public {
        require(!isDrivingLicenseExists(nationalID));
        drivingLicenses[nationalID] = DrivingLicense(
            nationalID,
            dob,
            vehicle_classes,
            names,
            postal_address,
            expiry,
            date_of_issue,
            true);

        emit AddedDrivingLicense(
            nationalID,
            dob,
            names,
            postal_address,
            expiry);
    }
    //get a title deed
    function getDrivingLicense(uint256 nationalID) public constant returns (bytes32[], bytes32, bytes32){
        require(isDrivingLicenseExists(nationalID));
        return (
        drivingLicenses[nationalID].vehicle_classes,
        drivingLicenses[nationalID].date_of_issue,
        drivingLicenses[nationalID].expiry);

    }
    //get a title deed owner
    function getDrivingLicenseOwner(uint256 nationalID) public constant returns (uint256, bytes32, bytes32, bytes32){
        require(isDrivingLicenseExists(nationalID));
        return (
        drivingLicenses[nationalID].nationalID,
        drivingLicenses[nationalID].dob,
        drivingLicenses[nationalID].postal_address,
        drivingLicenses[nationalID].names
        );

    }
    //is Driving License exists
    function isDrivingLicenseExists(uint256 nationalID) private constant returns (bool){
        if (drivingLicenses[nationalID].exists) {
            return true;
        }
        return false;
    }
}
