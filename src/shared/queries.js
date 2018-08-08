const addStudent = `
mutation($upi:String!,$education:String!){
addStudent(upi:$upi,education:$education){
id
}
}`
// const addKcpeRecord = `
// mutation($upi:String!,$education:String!){
// addStudent(upi:$upi,education:$education){
// id
// }`
const addSecondarySchoolRecord = `
mutation($upi:String!,
$math:Int,
$english:Int,
$kiswahili:Int,
$chemistry:Int,
$biology:Int,
$physics:Int,
$geography:Int,
$history:Int,
$religion:Int,
$business:Int,
$year:String){
addSecondarySchoolRecord(
upi:$upi,
math:$math,
english:$english,
kiswahili:$kiswahili,
chemistry:$chemistry,
biology:$biology,
physics:$physics,
geography:$geography,
history:$history,
religion:$religion,
business:$business,
year:$year
){
id
}
}`
const addPrimarySchoolRecord = `
mutation($upi:String!,$math:Int,$english:Int,$kiswahili:Int,$science:Int,$social_studies:Int,$year:String){
addPrimarySchoolRecord(upi:$upi,math:$math,english:$english,kiswahili:$kiswahili,science:$science,social_studies:$social_studies,year:$year
){
id
}
}`
const students = `
query($education:String!){
students(education:$education){
id
upi
}
}`

export {
    addStudent,
    students,
    addSecondarySchoolRecord,
    addPrimarySchoolRecord,
}
