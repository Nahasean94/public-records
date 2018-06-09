pragma solidity ^0.4.22;

contract PublicRecords {

    struct Institution {
        uint256 timestamp;
        bytes32 name;
        bytes32 dateFounded;
        bytes32 county;
        bytes32 upi;
        bytes32 category;
    }

    event AddedInstitution(
        uint256 timestamp,
        bytes32 name,
        bytes32 dateFounded,
        bytes32 county,
        bytes32 upi,
        bytes32 category);

    mapping(bytes32 => Institution) institutions;

    struct ECDERecord {
        uint256 timestamp;
        bytes32 upi;
        uint english;
        uint kiswahili;
        uint math;
        bytes32 date;
        bytes32 institution;
        bool repeater;

    }

    event AddedECDERecord(
        uint256 timestamp,
        bytes32 upi,
        uint english,
        uint kiswahili,
        uint math,
        bytes32 date,
        bytes32 institution);

    mapping(bytes32 => ECDERecord) ecdeRecords;

    struct PrimarySchoolRecord {
        uint256 timestamp;
        bytes32 upi;
        uint english;
        uint kiswahili;
        uint math;
        uint science;
        uint socialStudies;
        bytes32 date;
        bytes32 institution;
        bool repeater;
    }

    event AddedPrimarySchoolRecord(
        uint256 timestamp,
        bytes32 upi,
        uint english,
        uint kiswahili,
        uint math,
        uint science,
        uint socialStudies,
        bytes32 date,
        bytes32 institution
    );

    mapping(bytes32 => PrimarySchoolRecord) primarySchoolRecords;

    struct SecondarySchoolRecord {
        uint256 timestamp;
        bytes32 upi;
        uint english;
        uint kiswahili;
        uint math;
        uint biology;
        uint chemistry;
        uint physics;
        uint history;
        uint geography;
        uint religion;
        uint business;
        bytes32 date;
        bytes32 institution;
        bool repeater;
    }

    event AddedSecondarySchoolRecord(
        uint256 timestamp,
        bytes32 upi,
        uint english,
        uint kiswahili,
        uint math,
        uint biology,
        uint chemistry,
        uint physics,
        uint history,
        uint geography,
        uint religion,
        uint business,
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

    //add an institution
    function addInstitution(
        bytes32 name,
        bytes32 dateFounded,
        bytes32 county,
        bytes32 upi,
        bytes32 category
    ) public {
        require(!isInstitutionExists(upi)) ;
        institutions[upi] = Institution(now, name, dateFounded, county, upi, category);
        emit AddedInstitution(now, name, dateFounded, county, upi, category);
    }
    //get an institution
    function getInstitution(bytes32 upi) public constant returns (uint, bytes32, bytes32, bytes32, bytes32, bytes32){
        require (isInstitutionExists(upi));
        return (
        institutions[upi].timestamp,
        institutions[upi].name,
        institutions[upi].dateFounded,
        institutions[upi].county,
        institutions[upi].upi,
        institutions[upi].category);

    }
    //is institution exist
    function isInstitutionExists(bytes32 upi) private constant returns (bool){
        if (institutions[upi].upi.length == 0) {
            return false;
        }
        return true;
    }
    //add an ECDE Record
    function addECDECRecord(
        bytes32 upi,
        uint english,
        uint kiswahili,
        uint math,
        bytes32 date,
        bytes32 institution
    ) public {
        require(!isECDERecordExists(upi)) ;
        ecdeRecords[upi] = ECDERecord(now, upi, english, kiswahili, math, date, institution, false);
        emit AddedECDERecord(now, upi, english, kiswahili, math, date, institution);
    }

    //get an ECDE Record
    function getECDERecord(bytes32 upi) public constant returns (uint, bytes32, uint, uint, uint, bytes32, bytes32){
        require (isECDERecordExists(upi));
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
        if (ecdeRecords[upi].upi.length == 0) {
            return false;
        }
        return true;
    }
    //add a Primary School Record
    function addPrimarySchoolRecord(
        bytes32 upi,
        uint english,
        uint kiswahili,
        uint math,
        uint science,
        uint socialStudies,
        bytes32 date,
        bytes32 institution

    ) public {
        require(!isPrimarySchoolRecordExists(upi)) ;
        primarySchoolRecords[upi] = PrimarySchoolRecord(now, upi, english, kiswahili, math, science, socialStudies, date, institution, false);
        emit AddedPrimarySchoolRecord(now, upi, english, kiswahili, math, science, socialStudies, date, institution);
    }

    //get a Primary School Record
    function getPrimarySchoolInfo(bytes32 upi) public constant returns (uint, bytes32, bytes32, bytes32){
        require (isPrimarySchoolRecordExists(upi));
        return (
        primarySchoolRecords[upi].timestamp,
        primarySchoolRecords[upi].upi,
        primarySchoolRecords[upi].date,
        primarySchoolRecords[upi].institution);

    }
    //get primary school subjects
    function getPrimarySchoolSubjects(bytes32 upi) public constant returns (uint, uint, uint, uint, uint){
        require (isPrimarySchoolRecordExists(upi));
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
        if (primarySchoolRecords[upi].upi.length == 0) {
            return false;
        }
        return true;
    }
    //add Secondary school
    function addSecondarySchoolRecord(
        bytes32 upi,
        uint english,
        uint kiswahili,
        uint math,
        uint biology,
        uint chemistry,
        uint physics,
        uint history,
        uint geography,
        uint religion,
        uint business,
        bytes32 date,
        bytes32 institution
    ) public {
        require(!isSecondarySchoolRecordExists(upi)) ;
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
            false
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
    function getSecondarySchoolInfo(bytes32 upi) public constant returns (uint, bytes32, bytes32, bytes32){
        require (isSecondarySchoolRecordExists(upi));
        return (
        secondarySchools[upi].timestamp,
        secondarySchools[upi].upi,
        secondarySchools[upi].date,
        secondarySchools[upi].institution);
    }
    //get Humanities
    function getHumanitites(bytes32 upi) public constant returns (uint, uint, uint){
        require (isSecondarySchoolRecordExists(upi));
        return (
        secondarySchools[upi].history,
        secondarySchools[upi].religion,
        secondarySchools[upi].geography);
    }
    //get Core subjects
    function getCoreSubjects(bytes32 upi) public constant returns (uint, uint, uint){
        require (isSecondarySchoolRecordExists(upi));
        return (
        secondarySchools[upi].english,
        secondarySchools[upi].kiswahili,
        secondarySchools[upi].math);
    }
    //get sciences
    function getSciences(bytes32 upi) public constant returns (uint, uint, uint){
        require (isSecondarySchoolRecordExists(upi));
        return (
        secondarySchools[upi].biology,
        secondarySchools[upi].chemistry,
        secondarySchools[upi].physics);
    }
    //get electives
    function getElectives(bytes32 upi) public constant returns (uint){
        require (isSecondarySchoolRecordExists(upi));
        return (
        secondarySchools[upi].business);
    }

    //is Secondary schoool record exist
    function isSecondarySchoolRecordExists(bytes32 upi) private constant returns (bool){
        if (secondarySchools[upi].upi.length == 0) {
            return false;
        }
        return true;
    }
    //add an Undergraduate record
    function addUndergraduateRecord(
        bytes32 upi,
        bytes32 programme,
        bytes32 grade,
        bytes32 date,
        bytes32 institution
    ) public {
        require(!isUndergraduateRecordExists(upi)) ;
        undergraduateRecords[upi] = UndergraduateRecord(now, upi, programme, grade, date, institution);
        emit AddedUndergraduateRecord(now, upi, programme, grade, date, institution);
    }
    //get an Undergraduate record
    function getUndergroundRecord(bytes32 upi) public constant returns (uint, bytes32, bytes32, bytes32, bytes32, bytes32){
        require (isUndergraduateRecordExists(upi));
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
        if (undergraduateRecords[upi].upi.length == 0) {
            return false;
        }
        return true;
    }


}
