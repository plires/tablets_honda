var player = document.getElementById("player")

let app = new Vue({
  el: '#app',
  data: function() {
    return {
      motoSeleccionada: {},
      motoCorrecta: {},
      motoToShowInModal: {},
      motos: [],
      counter: '',
      currentSound: '',
      playButtonEnabled: false,
      pantallaInicio: true,
      pantallaJuego: false,
      pantallaGanadores: false,
      pantallaPerdedores: false,
    }
  },
  created() {
    this.veryfyLocalStorageSounds()
    this.veryfyLocalStorageCounter()

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
        description: 'Cuanto mayor sea el reto, mayor será la recompensa. Te animamos a que te atrevas. Inspirada en la leyenda de Dakar, con un rendimiento contundente, detalles en negro y nuevos colores tomados directamente de la competición de rallys, <span>la CRF1100L Africa Twin</span> nace para rendir cuando las cosas se ponen difíciles.',
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
      }
    ]

    this.showMoto(1) // Selecciono la primero moto disponible para que no de error el modal inicialmente

  },

  methods: {

    veryfyLocalStorageSounds: function() {

      if (!localStorage.sounds) {
        this.regenerateSounds()
      }

    },

    veryfyLocalStorageCounter: function() {

      if (!localStorage.counter) {
        this.generateCounter()
      }

    },

    regenerateSounds: function() {
      let mysounds = { 
        1: '1.mp3', 
        2: '2.mp3', 
        3: '3.mp3', 
        4: '4.mp3', 
      };

      localStorage.setItem("sounds", JSON.stringify(mysounds));
    },

    generateCounter: function() {
      let myCounter = 100;

      localStorage.setItem("counter", JSON.stringify(myCounter));
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

    setCounter: function() {
      // Guardamos y actualizamos el contador
      let counterStorage = JSON.parse(localStorage.getItem("counter"))
      counterStorage = counterStorage + 1
      localStorage.setItem("counter", JSON.stringify(counterStorage));
      this.counter = counterStorage
    },

    goToPantallaJuego: function() {
      this.hiddenAllScreen()
      this.pantallaJuego = true
      this.motoSeleccionada = {}

      this.setCounter()

      let obj = JSON.parse(localStorage.getItem("sounds")) // Guardo en un objeto el item "sounds" del localstorage
      var keys = Object.keys(obj) // Obtengo las key del objeto

      const key = keys[Math.floor(Math.random() * keys.length)] // Selecciono una al azar
      let sound = obj[key] // Selecciono el sonido de esa posicion
      
      delete obj[key]; // borro del objeto esa posicion
      // localStorage.clear("sounds"); // borrar el localstorage
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
      }

      let motoCorrecta = this.motos.filter((moto) => moto.id == moto_correcta_id)
      this.motoCorrecta = motoCorrecta[0]

    },

    motoSeleccionadaPorUsuario: function(id) {

      // Remover todas las clases "image_featured" de las imagenes
      let imagesMotos = document.getElementsByClassName('images_motos')

      for(var i = 0; i < imagesMotos.length ; i++)
      {
        imagesMotos[i].classList.remove('image_featured');
      }

      // Remover todas las clases "motos_featured" de los contenedores de imagenes
      let contentImagesMotos = document.getElementsByClassName('motos_featured')

      for(var i = 0; i < contentImagesMotos.length ; i++)
      {
        contentImagesMotos[i].classList.remove('motos_featured');
      }

      // Agregar la clases destacadas a la imagen y div contenedor a la cual se hizo click
      event.target.classList.add('image_featured')
      event.target.parentElement.classList.add('motos_featured')

      let motoFound = this.motos.filter((moto) => moto.id == id)

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

AOS.init();

