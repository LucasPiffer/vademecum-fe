<template>
  <div class="hello">
    <div class="holder">
      
      <form @submit.prevent="addLaw">
        <input type="text" autocomplete="off" placeholder="Nomeie a lei que você deseja observar" 
        v-model="name" v-validate="'min:5'" name="name">
        <transition name="alert-in" 
          leave-active-class="animated flipOutX"
          enter-active-class="animated flipInX">
          <p class="alert" v-if="errors.has('name')">{{errors.first('name')}}</p>
        </transition>
        
        <input type="text" autocomplete="off" placeholder="Observar uma lei: ex http://www.planalto.gov.br/ccivil_03/Leis/L10000.htm" 
        v-model="url" v-validate="'min:5'" name="url">
        
        <transition name="alert-in" 
          leave-active-class="animated flipOutX"
          enter-active-class="animated flipInX">
          <p class="alert" v-if="errors.has('url')">{{errors.first('url')}}</p>
        </transition>

        <button class="button" type="submit">Observar</button>        
      </form>

      <ul>
        <transition-group name="list" leave-active-class="animated bounceOutDown" enter-active-class="animated bounceInUp">
          <li v-for="(data, index) in laws" :key='index'>
            <span class="url">{{data.url}}</span><span class="name">{{data.name}}</span>
            <router-link :to="{ name: 'historico', params: { id: data._id }}">Ver histórico</router-link>
          </li>
        </transition-group>
      </ul>

      <p>Leis que você está observando</p>

      <!-- <div v-bind:class="alertObject"></div> -->
      <!-- <div v-bind:style="{ backgroundColor: bgColor, 
        height: bgHeight, width: bgWidth }"></div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Laws',
  data() {
    return {
      laws:[],
      name: "",
      url: "",
    }
  },
  methods: {
    addLaw() {
      this.$validator.validateAll().then((result) => {
        if(result) {
          this.$http.post('http://localhost:3000/api/laws', {name: this.name, url: this.url}).then(response => {
            this.laws.push( { name: this.name, url: this.url } )
            this.law = "";
          })
          
        } else {
          //console.log('Not valid');
        }
      })
    },
    remove(id) {
      this.laws.splice(id, 1)
    }
  },
  mounted() {
    this.$http.get('http://localhost:3000/api/laws').then(
      response => {
       this.laws = response.data
      }
    );
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
  @import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"; 
  
  .holder {
    background: #fff;
  }
  
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    float:left;
    width: 100%;
  }
  
  ul li {
    padding: 20px;
    font-size: 1.3em;
    background-color: #E0EDF4;
    border-left: 5px solid #3EB3F6;
    margin-bottom: 2px;
    color: #3E5252;
  }

  li a {
    font-size: 14px;
    float:right;
    color: #333;
    text-decoration: none;
  }

  p {
    text-align:center;
    padding: 30px 0;
    color: gray;
  }
  
  .container {
    box-shadow: 0px 0px 40px lightgray;
  }
  
  input {
    width: calc(100% - 40px);
    border: 0;
    padding: 20px;
    font-size: 1.3em;
    background-color: #323333;
    color: #687F7F;
  }
  
  .alert {
    background: #fdf2ce;
    font-weight: bold;
    display: inline-block;
    padding: 5px;
    margin-top: -20px;
  }
  
  .alert-in-enter-active {
    animation: bounce-in .5s;
  }
  .alert-in-leave-active {
    animation: bounce-in .5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
   
    50% {
      transform: scale(1.5);
    }
    
    100% {
      transform: scale(1);
    }
  }

  i {
    float:right;
    cursor:pointer;
  }

  button {
    background-color: #9bb3c1;
    color: white;
    font-size: 22px;
    border:none;
    padding: 20px;
    float:right;
    width: 100%;
  }

  
  .name {
    font-size: 10px;
    background-color: #fc0;
    padding: 5px;
    float:left;
    margin-right: 10px;
    box-shadow: 1px 1px 1px #333;
  }

  .url {
    font-size: 14px;
  }

 
</style>
