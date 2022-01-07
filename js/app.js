let app = new Vue({
  el: '#app',
  data: function() {
    return {
      soundSelected: '',
      motoSeleccionada: {},
      pantallaInicio: true,
      pantallaSeleccionar: false,
    }
  },
  mounted() {
  },

  methods: {

    goToPantallaSeleccionar: function() {
      this.selectSound(1)
      this.pantallaInicio = false
      this.pantallaSeleccionar = true
    },

    selectSound: function(sound) {

      switch(sound) {
        case 1:
          this.soundSelected = '1.mp3'
          break;
        case 2:
          this.soundSelected = '2.mp3'
        case 3:
          this.soundSelected = '3.mp3'
          break;
        default:
          this.soundSelected = '1.mp3'
      }

      $("#sound").attr("src", this.soundSelected);

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

