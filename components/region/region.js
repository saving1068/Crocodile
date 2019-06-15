const CityData = require('../../utils/citys');

Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    isShowPicker: {
      type: Boolean,
      value: false
    },
    /*
    * 三级联动初始化
    * eg:
    *[
    * {"id":360000,"name":"江西省","parent_id":"1","pinyin":"jiang xi sheng"},
    * {"id":360100,"name":"南昌市","parent_id":"360000","pinyin":"nan chang shi"},
    * {"id":360111,"name":"青山湖区","parent_id":"360100","pinyin":"qing shan hu qu"}
    * ]
    *
    * */
    initializeValue: {
      type: Array,
      value: [],
      observer: 'getCityIndex'
    }
  },
  data: {
    // 这里是一些组件内部数据
    provinces: [],
    province: "",
    cities: [],
    city: "",
    areas: [],
    area: '',
    regionId: '',
    value: [0, 0, 0],
    values: [0, 0, 0]
  },

  attached() {
    this.initRegion(this.data.value)
  },

  methods: {
    // 这里是一个自定义方法
    initRegion(v) {
      console.log(v)
      let p = v[0],
        c = v[1],
        a = v[2];

      let pl = CityData,
        cl = pl[p].sub,
        al = cl[c].sub;

      this.setData({
        provinces: pl,
        cities: cl,
        areas: al,
        province: pl[p].name,
        city: cl[c].name,
        area: al[a].name,
        regionId: al[a].code || cl[c].code
      })

    },

    bindChange(e) {
      console.log(e)
      var nv = e.detail.value;
      var ov = this.data.values;
      
      if(nv[0] != ov[0]){
        this.changeProvince(nv[0])
      }
      else if(nv[1] != ov[1]){
        this.changeCity(nv[1],nv)
      }
      else if(nv[2] != ov[2]){
        this.changeArea(nv[2])
      }

      this.setData({
        values: nv
      })
    },

    changeProvince(v){
      this.setData({
        province: CityData[v].name,
        cities: CityData[v].sub,
        areas: CityData[v].sub[0].sub,
        value: [v,0,0],
        city: CityData[v].sub[0].name,
        area: CityData[v].sub[0].sub[0].name,
        regionId: CityData[v].sub[0].sub[0].code || CityData[v].sub[0].code
      })
    },

    changeCity(v,nv){
      var c = this.data.cities;
      this.setData({
        city: c[v].name,
        areas: c[v].sub,
        area: c[v].sub.length>0?c[v].sub[0].name:'',
        value: [nv[0],nv[1],0],
        regionId: c[v].sub.length>0?c[v].sub[0].code:c[v].code
      })
    },
    
    changeArea(v){
      var a = this.data.areas;
      this.setData({
        area: a[v].name,
        regionId: a[v].code
      })
    },

    showPicker(){
      var isTrue = this.data.isShowPicker;
      this.setData({
        isShowPicker: !isTrue,
      })
    },

    surePicker(){
      this.setData({
        isShowPicker: false,
        isSureSel: true
      })

      let value = {
        value: this.data.province + this.data.city + this.data.area,
        regionId: this.data.regionId
      }

      this.triggerEvent('sure', value)
    },

    getCityIndex(newVal, oldVal){
      if(newVal != oldVal){
        var v = [0,0,0];
        var province = '',
          city = '',
          area = '',
          regionId = '';

        console.log(newVal)

        for(let p in CityData){
          if(newVal[0].id == CityData[p].code){
            v[0] = p;
            province = CityData[p].name

            let cl = CityData[p].sub;
            console.log(cl)
            console.log(newVal[1])
            for(let c in cl){
              console.log(newVal[1].id)
              console.log(cl[c].code)
              console.log(newVal[1].id == cl[c].code )
              if(newVal[1].id == cl[c].code){
                v[1] = c;
                city = cl[c].name
                regionId = cl[c].code;

                if(newVal[2]){
                  var al = cl[c].sub
                  for(let a in al){
                    if(newVal[2].id == al[a].code){
                      v[2] = a;
                      area = al[a].name;
                      regionId = al[a].code;
                      break;
                    }
                  }
                }

                break;
              }
            }
            break;
          }
        }
        this.initRegion(v);
        this.setData({
          value: v,
          values: v,
          isSureSel: true
        })

        let value = {
          value: province + city + area,
          regionId: regionId
        }

        this.triggerEvent('sure', value)
      }
    },
  }
})