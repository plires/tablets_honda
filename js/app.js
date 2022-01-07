var player = document.getElementById("player")

let app = new Vue({
  el: '#app',
  data: function() {
    return {
      soundSelected: '',
      motoSeleccionada: {},
      motoCorrecta: {},
      pantallaInicio: true,
      pantallaJuego: false,
      pantallaGanadores: false,
      pantallaPerdedores: false,
    }
  },
  mounted() {
    this.veryfyLocalStorage()
  },

  methods: {

    veryfyLocalStorage: function() {

      if (!localStorage.sounds) {
        this.regenerateSounds()
      }

    },

    regenerateSounds: function() {
      let mysounds = { 
        1: 'sounds/1.mp3', 
        2: 'sounds/2.mp3', 
        3: 'sounds/3.mp3', 
        4: 'sounds/1.mp3', 
        5: 'sounds/2.mp3', 
        6: 'sounds/3.mp3'
      };

      localStorage.setItem("sounds", JSON.stringify(mysounds));
    },

    hiddenAllScreen: function() {
      this.pantallaInicio = false
      this.pantallaJuego = false
      this.pantallaGanadores = false
      this.pantallaPerdedores = false
    },

    goToPantallaJuego: function() {
      this.hiddenAllScreen()
      this.pantallaJuego = true

      let obj = JSON.parse(localStorage.getItem("sounds")) // Guardo en un objeto el item "sounds" del localstorage
      var keys = Object.keys(obj) // Obtengo las key del objeto

      const key = keys[Math.floor(Math.random() * keys.length)] // Selecciono una al azar
      let sound = obj[key] // Selecciono el sonido de esa posicion
      
      delete obj[key]; // borro del objeto esa posicion
      localStorage.clear(); // borrar el localstorage
      localStorage.setItem("sounds", JSON.stringify(obj)); // generar el nuevo local storage con el nuevo objeto

      if (Object.keys(obj).length === 0) {
        this.regenerateSounds()  
      }

      this.selectSound(sound)

    },

    selectSound: function(sound) {

      player.pause();
      player.setAttribute('src', sound);
      player.load();
      player.play();

    },

    seleccionarMoto: function(moto) {
      
      this.motoSeleccionada.id = moto
      this.motoSeleccionada.name = 'XR'
      this.motoSeleccionada.cilindrada = 350
      console.log(this.motoSeleccionada)
      
    }

  },
  computed: {
  }
});

