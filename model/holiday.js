/**
 * Created by 1 on 2016/5/16.
 */
var mongoose=require('mongoose');

var  holidayschema=new mongoose.Schema({
    user_name:String,
    begin_time:String,
    end_time:String,
    reason:String,
    feedback:String
});

mongoose.model('Holiday',holidayschema);