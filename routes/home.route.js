router.get('/home', function(req, res) {
    var folder_list_data = [],
        view_list_data = [];

    if (req.session.islogin) {
        res.locals.islogin = req.session.islogin;
    }
    if (req.cookies.islogin) {
        req.session.islogin = req.cookies.islogin;
    }
    var user_msg = res.locals.islogin;

    dbCon.folderSelect(client, user_msg.user_id, function(err,result){
        if(err) throw err;
        if(!err){
            var max_level = 1,
                temp_arr = [],
                temp_2d_arr = [];
            for (var i = 0; i < result.length; i++) {                
                if (result[i].folder_level>max_level) {
                    max_level = result[i].folder_level;
                }
                result[i].sub_list = [];
                temp_arr.push(result[i]);
            }
            for (var i = 0; i < max_level; i++) {
                temp_2d_arr.push(new Array());
            }
            for (var i = 0; i < temp_arr.length; i++) {
                temp_2d_arr[temp_arr[i].folder_level-1].push(temp_arr[i]);
            }
            arrRecur(folder_list_data, temp_2d_arr, 0, max_level, "root");

            var note_select_opt = {
                belong_folder_id: "root",
                user_id: user_msg.user_id
            };

            dbCon.noteSelect(client, note_select_opt, function(err,result){
                if(err) throw err;
                if(!err){
                    var view_list_data = result;
                    res.render('home', {
                        title: '首页',
                        user_msg: res.locals.islogin, 
                        side_data: folder_list_data,
                        search_data: view_list_data
                    });
                }
            });            
        }
    }); 

    function arrRecur(sub_list, temp_2d_arr, cur_level, max_level, par_folder_id){
        cur_level++;
        if(cur_level>max_level){
            return false;
        }else{

            for (var i = 0; i < temp_2d_arr[cur_level-1].length; i++) {
                var this_folder = temp_2d_arr[cur_level-1][i];

                if (this_folder.par_folder_id === par_folder_id) {
                    sub_list.push(this_folder);
                    arrRecur(
                        this_folder.sub_list, 
                        temp_2d_arr, 
                        cur_level, 
                        max_level,
                        this_folder.folder_id
                    );
                }
            }            
            
        }
    }
});
