<template>
  <div class="add">
    <el-dialog title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="上级分类 " label-width="80px">
          <el-select v-model="form.pid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-optio v-for="item in list" :key="item.id" :label="item.title" :value="item.id"> -->

        <!-- </el-optio> -->

        <el-form-item label="分类名称" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="80px" v-if="form.type==1">
          <el-upload class="avatar-uploader" action="#" :show-file-list="false"
          :on-change="changeImg">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="开关" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添加</el-button>
        <el-button type="primary" @click="update" v-else>添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  requestMenuAdd,
  requestMenuDetail,
  requestMenuUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  data() {
    return {
      imageUrl: "",

      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
    };
  },

  methods: {
    ...mapActions({
      requestList: "menu/requestList",
    }),

    changeImg(e){
        if(e.size>2*1024*1024){
            warningAlert("上传的图片不能超过2m");
            return;

        }
        var extname= e.name.slice(e.name.lastIndexOf("."))
        var extArr=[".png",".jpg",".gif",".jpeg"]
        if(extArr.some(item=>item==extname)){
            warningAlert("上传文件必须是图片");
            return;
        }

        var file=e.raw;
        this.imageUrl=URL.createObjectURL(file)


    },

    emty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    add() {
      requestMenuAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    getDetail(id) {
      requestMenuDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    update() {
      requestMenuUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.add >>> .el-upload:hover {
  border: 1px dashed #409eff !important;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>


 