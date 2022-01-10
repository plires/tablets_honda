var player = document.getElementById("player")

let app = new Vue({
  el: '#app',
  data: function() {
    return {
      motoSeleccionada: {},
      motoCorrecta: {},
      motoToShowInModal: {},
      motos: [],
      currentSound: '',
      playButtonEnabled: false,
      pantallaInicio: true,
      pantallaJuego: false,
      pantallaGanadores: false,
      pantallaPerdedores: false,
    }
  },
  mounted() {
    this.veryfyLocalStorage()

    this.motos = [
      {
        id: 1,
        name: 'CRF450R',
        description: 'En el motocross actual, el Holeshot es una obsesión para cualquier corredor. <span>La Honda CRF450R</span> es una máquina diseñada para estar siempre adelante en la primera curva, sin resignar ese liderazgo hasta la bandera a cuadros. Sus características, detalles tecnológicos y diseño están optimizados para el exigente circuito de MX mundial, donde una fracción de segundo es la ventaja que te permitirá marcar la diferencia a tu favor.',
        image_sm: 'crf450r.jpg',
        image_lg: 'crf450r-gr.jpg'
      },
      {
        id: 2,
        name: 'AFRICA TWIN',
        description: 'Más liviana, más poderosa, más control. <span>La nueva CBR1000RR</span> SP1 tiene un motor de 16 válvulas DOHC con 10 caballos de fuerza más y contribuyendo una disminución en su peso total. Tiene una mejora de 14% en potencia sobre peso. La nueva SP mantiene al usuario amigable, dado a su gran paquete electrónico que es lo principal de su concepto de control total.',
        image_sm: 'africa.jpg',
        image_lg: 'africa-gr.jpg'
      },
      {
        id: 3,
        name: 'CBR 1000RR',
        description: 'Más liviana, más poderosa, más control. <span>La nueva CBR1000RR</span> SP1 tiene un motor de 16 válvulas DOHC con 10 caballos de fuerza más y contribuyendo una disminución en su peso total. Tiene una mejora de 14% en potencia sobre peso. La nueva SP mantiene al usuario amigable, dado a su gran paquete electrónico que es lo principal de su concepto de control total.',
        image_sm: 'cbr1000rr.jpg',
        image_lg: 'cbr1000rr-gr.jpg'
      },
      {
        id: 4,
        name: 'CB1000R',
        description: 'Una naked deportiva que marca la diferencia. Compacta y robusta, es el foco de atención de todas las miradas con sus acabados metálicos pulidos que son el reflejo de la tradicional Café Racer potente y con carácter. Es una bestia poderosa que se maneja y responde perfectamente. Animate a conocer <span>la nueva Honda CB1000R.</span>',
        image_sm: 'cbr1000r.jpg',
        image_lg: 'cbr1000r-gr.jpg'
      },
      {
        id: 5,
        name: 'MOTO_5',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        image_sm: 'moto_5.jpg',
        image_lg: 'moto_5-gr.jpg'
      },
      {
        id: 6,
        name: 'MOTO_6',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        image_sm: 'moto_6.jpg',
        image_lg: 'moto_6-gr.jpg'
      }
    ]

  },

  methods: {

    veryfyLocalStorage: function() {

      if (!localStorage.sounds) {
        this.regenerateSounds()
      }

    },

    regenerateSounds: function() {
      let mysounds = { 
        1: '1.mp3', 
        2: '2.mp3', 
        3: '3.mp3', 
        4: '4.mp3', 
        5: '5.mp3', 
        6: '6.mp3'
      };

      localStorage.setItem("sounds", JSON.stringify(mysounds));
    },

    hiddenAllScreen: function() {
      this.pantallaInicio = false
      this.pantallaJuego = false
      this.pantallaGanadores = false
      this.pantallaPerdedores = false
    },

    goToPantallaInicio: function() {
      player.pause();
      this.motoSeleccionada = {}
      this.playButtonEnabled = false
      this.hiddenAllScreen()
      this.pantallaInicio = true
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

    goToPantallaGanadores: function() {
      player.pause();
      this.playButtonEnabled = false
      this.hiddenAllScreen()
      this.pantallaGanadores = true
    },

    goToPantallaPerdedores: function() {
      player.pause();
      this.playButtonEnabled = false
      this.hiddenAllScreen()
      this.pantallaPerdedores = true
    },

    jugar: function() {

      if ( this.motoCorrecta.id === this.motoSeleccionada.id) {

        this.goToPantallaGanadores()

      } else {
        
        this.goToPantallaPerdedores()

      }

    },

    showMoto: function(moto_id) {

      let motoToShowInModal = this.motos.filter((moto) => moto.id == moto_id)
      this.motoToShowInModal = motoToShowInModal[0]

    },

    selectSound: function(sound) {

      player.pause();
      player.setAttribute('src', 'sounds/' + sound);
      player.load();
      player.play();

      this.currentSound = sound

      this.setCorrectMotorcycle(sound) // Seleccionar la moto correcta en base al sonido que se reproduce

    },

    setCorrectMotorcycle: function(sound) {

      switch (sound) {
        case '1.mp3':
          moto_correcta_id = 1;
          break;
        case '2.mp3':
          moto_correcta_id = 2;
          break;
        case '3.mp3':
          moto_correcta_id = 3;
          break;
        case '4.mp3':
          moto_correcta_id = 4;
          break;
        case '5.mp3':
          moto_correcta_id = 5;
          break;
        case '6.mp3':
          moto_correcta_id = 6;
          break;
      }

      let motoCorrecta = this.motos.filter((moto) => moto.id == moto_correcta_id)

      this.motoCorrecta = motoCorrecta[0]

    },


    motoSeleccionadaPorUsuario: function(moto_id) {

      // Remover todas las clases "image_featured" de las imagenes
      let imagesMotos = document.getElementsByClassName('images_motos')

      for(var i = 0; i < imagesMotos.length ; i++)
      {
        imagesMotos[i].classList.remove('image_featured');
      }

      // Agregar la clase "image_featured" a la imagen a la cual se hizo click
      event.target.classList.add('image_featured')

      let motoFound = this.motos.filter((moto) => moto.id == moto_id)

      this.motoSeleccionada = motoFound[0]

      this.playButtonEnabled = true // habilitar el boton

    }

  },
  computed: {

    verifyMotoSelected: function() {
      if ( !this.playButtonEnabled ) { // Si no hay una moto seleccionada
        return true
      } else {
        return false
      }
    }
  }

});

