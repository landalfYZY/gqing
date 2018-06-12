define({ "api": [
  {
    "type": "post",
    "url": "/api/user/get",
    "title": "用户登录",
    "description": "<p>用户登录</p>",
    "name": "get",
    "group": "userInfo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "loginName",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "loginPass",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\" : \"true\",\n    \"result\" : {\n        \"name\" : \"loginName\",\n        \"password\" : \"loginPass\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/user/submit-login"
      }
    ],
    "version": "1.0.0",
    "filename": "app/controllers/userInfo.server.js",
    "groupTitle": "userInfo"
  },
  {
    "type": "post",
    "url": "/api/user/insert",
    "title": "用户注册",
    "description": "<p>用户注册</p>",
    "name": "insert",
    "group": "userInfo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "telNumber",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lpassword",
            "description": "<p>确认密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\" : \"true\",\n    \"result\" : {\n        \"name\" : \"loginName\",\n        \"password\" : \"loginPass\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/user/submit-login"
      }
    ],
    "version": "1.0.0",
    "filename": "app/controllers/userInfo.server.js",
    "groupTitle": "userInfo"
  }
] });
