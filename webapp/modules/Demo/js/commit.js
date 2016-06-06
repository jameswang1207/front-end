//bind
new Vue({
  el:'.app',
  data:{
    message:'this vue bind'
  }
});

//table
new Vue({
  el:'.table',
  data:{
    datas:[
      {text:'one'},
      {text:'two'},
      {text:'three'}
    ]
  }
});

//user input
//
function check(){
  return true;
}

new Vue({
  el:'.user-input',
  data:{
    message: 'Hello Vue.js!',
    classA:check(),
    classB:false,
    styleObject:{
      color:'red',
      fontSize:'20px'
    },
    ok : false
  },
  methods:{
    remessage : function(){
      console.log(this.ok);
      this.message = this.message.split('').reverse().join('');
    }
  },
  computed:{
    b : function(){
      return this.message + "hheehhe"
    }
  }
});