router.post("/delFolder",function(req, res, next){
	
	var req_body = req.body;

	var start_level;

	start_level = req_body.folder_level,
	start_folder_id = req_body.folder_id;


    var user_msg = req.session.islogin;

    var delete_folders = [];

    delete_folders.push(start_folder_id);

    var folder_affected_rows = 0,
        note_affected_rows = 0;

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
            arrRecur(
                delete_folders, 
                temp_2d_arr, 
                start_level, 
                max_level, 
                start_folder_id
            );
            dbCon.folderDel(client, delete_folders, function(err, result){
                if(err) throw err;
                if(!err){
                    folder_affected_rows = result.affectedRows;
                    var set_str = "",
                        tail = ",";
                    for (var i = 0; i < delete_folders.length; i++) {
                        if(i===delete_folders.length-1){
                            tail = "";
                        }
                        set_str+= "'"+delete_folders[i]+"'"+tail;
                    }
                    var condition = " belong_folder_id in ("+set_str+")";
                    dbCon.noteDel(client, condition, function(err, result){
                        if(err) throw err;
                        if(!err){
                            note_affected_rows = result.affectedRows;
                            if(folder_affected_rows===delete_folders.length){
                                res.send({
                                    is_delete_all: true,
                                    msg: "删除成功"
                                });
                            }else{
                                res.send({
                                    is_delete_all: false,
                                    msg: "删除失败"
                                });
                            }
                        }
                    });
                }
            });
		}
	});
	function arrRecur(list, temp_2d_arr, cur_level, max_level, par_folder_id){
		cur_level++;
        if(cur_level>max_level){
            return false;
        }else{
            for (var i = 0; i < temp_2d_arr[cur_level-1].length; i++) {
                var this_folder = temp_2d_arr[cur_level-1][i];

                if (this_folder.par_folder_id === par_folder_id) {
                    list.push(this_folder.folder_id);
                    arrRecur(
                        list, 
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