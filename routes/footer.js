
var side_bar_temp = require("../views/sideBar.ejs");

var side_bar_html = side_bar_temp({
            side_test_data:side_test_data
        }
    );
// console.log(side_bar_html);

module.exports = router;