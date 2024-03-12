export default {
    methods: {
        dateTime(val) {
            //convert to date time string
            if (!val) {
                return ''
            }
            var date = new Date(val);
            return date.toLocaleDateString('en-us', { year: "numeric", month: "short", day: "2-digit", hour: '2-digit', minute: '2-digit' })
        },
        resultFormat(val, is_super) {
            if(val == "left" && is_super == true){
                return 'SUPER PULA';
            }
            if(val == "right" && is_super == true){
                return 'SUPER PUTI';
            }
            if(val == "left" && is_super == false){
                return 'PULA';
            }
            if(val == "right" && is_super == false){
                return 'PUTI';
            }
            if(val == "cancel"){
                return 'CANCEL';
            }
            // ? "SUPER PULA"
            // : r.match.result == "right" && r.match.is_super == true
            // ? "SUPER PUTI"
            // : r.match.result == "left" && r.match.is_super == false
            // ? "PULA"
            // : r.match.result == "right" && r.match.is_super == false
            // ? "PUTI"
            // : r.match.result == "cancel"
            // ? "CANCELLED"
            // : "WAITING RESULT"
        },
        dateOnly(val) {
            //convert to date time string
            if (!val) {
                return ''
            }
            var date = new Date(val);
            return date.toLocaleDateString('en-us', { year: "numeric", month: "short", day: "2-digit" })

        },
        timeOnly(val) {
            //convert to date time string
            if (!val) {
                return ''
            }
            var date = new Date(val);
            return date.toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        },
        lottoType(val) {
            var str = ""
            switch (val) {
                case "1", 1:
                    str = "6/58 Ultra Lotto";
                    break;
                case "2", 2:
                    str = "6/55 Grand Lotto";
                    break;
                case "3", 3:
                    str = "6/49 Super Lotto";

                    break;
                case "4", 4:
                    str = "6/45 Mega Lotto";

                    break;
                case "5", 5:
                    str = "6/42 Lotto";

                    break;
                case "6", 6:
                    str = "6D Lotto";

                    break;
                case "7", 7:
                    str = "4D Lotto";

                    break;
                case "8", 8:
                    str = "3D Lotto";
                    break;
                case "9", 9:
                    str = "2D Lotto";
                    break;
            }
            return str
        },
        lottoTypeShort(val) {
            var str = ""
            switch (val) {
                case "1", 1:
                    str = "6/58";
                    break;
                case "2", 2:
                    str = "6/55";
                    break;
                case "3", 3:
                    str = "6/49";

                    break;
                case "4", 4:
                    str = "6/45";

                    break;
                case "5", 5:
                    str = "6/42";

                    break;
                case "6", 6:
                    str = "6D";

                    break;
                case "7", 7:
                    str = "4D";

                    break;
                case "8", 8:
                    str = "3D";
                    break;
                case "9", 9:
                    str = "2D";
                    break;
            }
            return str
        },
        lottoTypeBG(val) {
            var str = ""
            switch (val) {
                case "1", 1:
                    str = "bg-658";
                    break;
                case "2", 2:
                    str = "bg-655";
                    break;
                case "3", 3:
                    str = "bg-649";

                    break;
                case "4", 4:
                    str = "bg-645";

                    break;
                case "5", 5:
                    str = "bg-642";

                    break;
                case "6", 6:
                    str = "bg-6D";

                    break;
                case "7", 7:
                    str = "bg-4D";

                    break;
                case "8", 8:
                    str = "bg-3D";
                    break;
                case "9", 9:
                    str = "bg-2D";
                    break;
            }
            return str
        },
        inputNumToString(val) {
            var str = val ? val.toString() : ''

            // check if have decimal

            return (val < 0 ? '-' : '') + str.replace(/^0+/, '')
                .replace(/[^0-9]/g, '')
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        },
        numToString(val) {
            var str = val ? val.toString() : ''

            // check if have decimal

            return val > 0 ? (val < 0 ? '-' : '') + str.replace(/^0+/, '')
                .replace(/[^0-9]/g, '')
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '0'
        },
        stringToNum(val) {
            return parseInt(val.replace(/[^0-9]/g, ''))
        },
    }
}