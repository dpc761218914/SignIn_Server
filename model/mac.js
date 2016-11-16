/**
 * Created by 1 on 2016/5/16.
 */
var mongoose=require('mongoose');

var  macschema=new mongoose.Schema({
    lab_name:String,
    mac_address:String
});

mongoose.model('Mac',macschema);