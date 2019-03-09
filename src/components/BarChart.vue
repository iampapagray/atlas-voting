<script>
  //Importing Bar class from the vue-chartjs wrapper
  import db from './firebaseInit'
  import { Bar } from 'vue-chartjs'
  //Exporting this so it can be used in other components
  export default {
    extends: Bar,
    data () {
      return {
        datacollection: {
          //Data to be represented on x-axis
          labels: ['Esinam', 'Solange', 'Lisa', 'Mabee', 'Pediba'],
          datasets: [
            {
              label: 'ATLAS Got Talent',
              backgroundColor: ['yellow', 'blue','green','red','purple'],
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              //Data to be represented on y-axis
              data: [0, 0, 0, 0, 0]
            }
          ]
        },
        //Chart.js options that controls the appearance of the chart
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {

      db.collection('votes').get().then(querySnapshot => {
        if(querySnapshot.empty){
          console.log('not found')
        }

        querySnapshot.forEach(doc => {
          var data = doc.data()
          if(data.name == "Mabee"){
            this.datacollection.datasets[0].data[3] += parseInt(data.quantity)
          }else if(data.name == "Esinam"){
            this.datacollection.datasets[0].data[0] += parseInt(data.quantity)
          }else if(data.name == "Solange"){
            this.datacollection.datasets[0].data[1] += parseInt(data.quantity)
          }else if(data.name == "Lisa"){
            this.datacollection.datasets[0].data[2] += parseInt(data.quantity)
          }else if(data.name == "Pediba"){
            this.datacollection.datasets[0].data[4] += parseInt(data.quantity)
          }

        })

      this.renderChart(this.datacollection, this.options)

      })
      //renderChart function renders the chart with the datacollection and options object.
      // this.renderChart(this.datacollection, this.options)

    }
  }
</script>