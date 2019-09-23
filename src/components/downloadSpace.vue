<template>
  <div>
    <div class="buttonClass">
      <el-button
        :disabled="multipleSelection.length==0"
        icon="el-icon-download"
        type="primary"
        plain
      >下载</el-button>
    </div>
    <div style="margin:5px;">
      <a
        style="font-size:13px;"
        v-for="(item,index) in navigationList"
        :key="index"
        :class="[index == navigationList.length -1 ? 'nolink':'islink']"
        @click="gotoUp(index)"
      >{{item}}></a>
    </div>
    <el-table :data="fileData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="35"></el-table-column>
      <el-table-column label="文件名">
        <template slot-scope="scope">
          <span>
            <div class="format" :class="formatClass(scope.row.fileName)"></div>
            <div style="display:inline-block;">
              <a
                class="link"
                style="margin-left:5px;"
                @click="gotoNext(scope.row)"
              >{{scope.row.fileName}}</a>
            </div>
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="150">
        <template>
          <el-button type="primary" size="mini" icon="el-icon-download" circle plain></el-button>
        </template>
      </el-table-column>
      <el-table-column label="文件大小" prop="fileSize" width="150"></el-table-column>
      <el-table-column label="上传时间" prop="fileTime" width="250"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "DownloadSpace",
  data() {
    return {
      fileData: [],
      multipleSelection: [],
      navigationList: ["全部文件"],
      allData: [
        {
          fileName: "文件夹1",
          fileSize: "-",
          fileTime: "2019-09-20 17:00:01",
          children: [
            {
              fileName: "文件1.xls",
              fileSize: "156k",
              fileTime: "2019-09-20 17:00:01"
            },
            {
              fileName: "文件2.exe",
              fileSize: "56M",
              fileTime: "2019-09-20 17:00:01"
            },
            {
              fileName: "文件3.sss",
              fileSize: "23M",
              fileTime: "2019-09-20 17:00:01"
            }
          ]
        },
        {
          fileName: "文件夹2",
          fileSize: "-",
          fileTime: "2019-09-20 17:00:01",
          children: [
            {
              fileName: "文件4.pdf",
              fileSize: "3.2M",
              fileTime: "2019-09-20 17:00:01"
            },
            {
              fileName: "文件5.jpg",
              fileSize: "2M",
              fileTime: "2019-09-20 17:00:01"
            },
            {
              fileName: "文件6.txt",
              fileSize: "15k",
              fileTime: "2019-09-20 17:00:01"
            }
          ]
        },
        {
          fileName: "文件7.mp4",
          fileSize: "1.1GB",
          fileTime: "2019-09-20 17:00:01"
        },
        {
          fileName: "文件8.html",
          fileSize: "210B",
          fileTime: "2019-09-20 17:00:01"
        },
        {
          fileName: "文件9.doc",
          fileSize: "200k",
          fileTime: "2019-09-20 17:00:01"
        },
        {
          fileName: "文件10.zip",
          fileSize: "23M",
          fileTime: "2019-09-20 17:00:01"
        },
        {
          fileName: "文件10.ppt",
          fileSize: "23M",
          fileTime: "2019-09-20 17:00:01"
        }
      ]
    };
  },
  methods: {
    formatClass(fileName) {
      if (fileName) {
        var startIndex = fileName.lastIndexOf(".");
        if (startIndex != -1) {
          var format = fileName
            .substring(startIndex + 1, fileName.length)
            .toLowerCase();
          switch (format) {
            case "apk":
              return "android-mini";
            case "xls":
            case "xlsx":
              return "excel-mini";
            case "exe":
              return "exe-mini";
            case "pdf":
              return "pdf-mini";
            case "jpg":
            case "jpeg":
            case "png":
            case "bmp":
            case "gif":
            case "svg":
            case "ico":
              return "picture-mini";
            case "ppt":
            case "pptx":
              return "ppt-mini";
            case "txt":
              return "text-mini";
            case "mp3":  
            case "mp4":
            case "rmvb":
            case "avi":
            case "mkv":
            case "flv":
            case "mov":
              return "video-mini";
            case "html":
              return "web-mini";
            case "doc":
            case "docx":
              return "word-mini";
            case "zip":
            case "rar":
              return "zip-mini";
            default:
              return "unknow-mini";
          }
        } else return "folder-mini";
      } else {
        return "unknow-mini";
      }
    },
    gotoNext(folder) {
      if (folder.children && folder.children.length > 0) {
        this.fileData = folder.children;
        this.navigationList.push(folder.fileName);
      }
    },
    gotoUp(index) {
      this.navigationList = this.navigationList.slice(0, index + 1);
      this.fileData = this.allData;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  created() {
    this.fileData = this.allData;
  }
};
</script>


<style scoped>
.nolink {
  cursor: default;
  color: #000;
}
.islink {
  cursor: pointer;
  color: #09aaff;
}
.islink :hover {
  text-decoration: underline;
}
.link {
  cursor: pointer;
  color: #666;
}
.link:hover {
  color: #09aaff;
}
.format {
  width: 25px;
  height: 25px;
  margin-bottom: -5px;
  display: inline-block;
  background-size: cover;
}
.android-mini {
  background: url("../assets/img//format/Android.png") no-repeat;
}
.excel-mini {
  background: url("../assets/img//format/Excel.png") no-repeat;
}
.exe-mini {
  background: url("../assets/img//format/EXE.png") no-repeat;
}
.folder-mini {
  background: url("../assets/img//format/Folder.png") no-repeat;
}
.pdf-mini {
  background: url("../assets/img//format/PDF.png") no-repeat;
}
.picture-mini {
  background: url("../assets/img//format/Picture.png") no-repeat;
}
.ppt-mini {
  background: url("../assets/img//format/PPT.png") no-repeat;
}
.text-mini {
  background: url("../assets/img//format/TEXT.png") no-repeat;
}
.unknow-mini {
  background: url("../assets/img//format/UnKnow.png") no-repeat;
}
.video-mini {
  background: url("../assets/img//format/Video.png") no-repeat;
}
.web-mini {
  background: url("../assets/img//format/Web.png") no-repeat;
}
.word-mini {
  background: url("../assets/img//format/Word.png") no-repeat;
}
.zip-mini {
  background: url("../assets/img//format/ZIP.png") no-repeat;
}
</style>
