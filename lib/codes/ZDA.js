var Helper = require("../Helper.js");

/*

0	Message ID $GPZDA
1	UTC
2	Day, ranging between 01 and 31
3	Month, ranging between 01 and 12
4	Year
5	Local time zone offset from GMT, ranging from 00 through ±13 hours
6	Local time zone offset from GMT, ranging from 00 through 59 minutes
7	The checksum data, always begins with *


$--ZDA,hhmmss.xx,dd,mm,yyyy,oh,om
$GNZDA,164521.00,02,12,2016,00,00*79

*/


exports.Decoder = function(id) {
    this.id = id;
    this.talker_type_id = "ZDA";
    this.talker_type_desc = "Date & Time & Time Offset"; 
    this.parse = function(tokens) {
        var i;
        var zda;
        if(tokens.length < 7) {
            throw new Error('ZDA - not enough tokens');
        }

        // trim whitespace
        // some parsers may not want the tokens trimmed so the individual parser has to do it if applicable
        for( i = 0; i < tokens.length; ++i) {
            tokens[i] = tokens[i].trim();
        }

        return {
            id : tokens[0].substr(1),
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            time : tokens[1],
            date : tokens[2],
            month : tokens[3],
            year : tokens[4],
            localOffsetHour : tokens[5],
            localOffsetMinutes : tokens[6]  

        };
    };
};
