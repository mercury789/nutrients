function set(name, value) {
   localStorage.setItem(name, value)
}
function rem(name) {
   localStorage.removeItem(name)
}
function get(name) {

   return localStorage.getItem(name)
}
function clear() {
   localStorage.clear()
}


function log(data) {
  console.log(data)
}
function dq(data) {
  return document.querySelector(data)
}
function create(data) {
  return document.createElement(data)
}
function colorProcent(data) {
  if (data <= 40 && data >= 11) {
    return '--bgc: #A83232;'
  }
  if (data <= 70 && data >= 41) {
  return '--bgc: #C26B38;'
  }
  if (data <= 99 && data >= 71) {
  return '--bgc: #3A6B8C;'
  }
  if (data >= 100) {
  return '--bgc: #3F7A53;'
  }

}
function max100(data) {
  if (data >= 100) {
    return 100
  } else {
    return data
  }
  
}
function dqa(data) {
  return document.querySelectorAll(data)
}


let params = null;

let asian = null;
let berries = null;
let breads = null;
let dairy = null;
let fish = null;
let fastfood = null;
let fruits = null;
let grains = null;
let lagumes = null;
let meat = null;
let mushrooms = null;
let nuts = null;
let oils = null;
let seafood = null;
let seeds = null;
let teas = null;
let vegetables = null;

async function init() {
  const [
    paramsRes,
    asianRes,
    berriesRes,
    breadsRes,
    dairyRes,
    fishRes,
    fastfoodRes,
    fruitsRes,
    grainsRes,
    lagumesRes,
    meatRes,
    mushroomsRes,
    nutsRes,
    oilsRes,
    seafoodRes,
    seedsRes,
    teasRes,
    vegetablesRes
  ] = await Promise.all([
    fetch('./data/params.json'),
    fetch('./data/asian.json'),
    fetch('./data/berries.json'),
    fetch('./data/breads.json'),
    fetch('./data/dairy.json'),
    fetch('./data/fish.json'),
    fetch('./data/fastfood.json'),
    fetch('./data/fruits.json'),
    fetch('./data/grains.json'),
    fetch('./data/lagumes.json'),
    fetch('./data/meat.json'),
    fetch('./data/mushrooms.json'),
    fetch('./data/nuts.json'),
    fetch('./data/oils.json'),
    fetch('./data/seafood.json'),
    fetch('./data/seeds.json'),
    fetch('./data/teas.json'),
    fetch('./data/vegetables.json')
  ]);
  
  params = await paramsRes.json();
  asian = await asianRes.json();
  berries = await berriesRes.json();
  breads = await breadsRes.json();
  dairy = await dairyRes.json();
  fish = await fishRes.json();
  fastfood = await fastfoodRes.json();
  fruits = await fruitsRes.json();
  grains = await grainsRes.json();
  lagumes = await lagumesRes.json();
  meat = await meatRes.json();
  mushrooms = await mushroomsRes.json();
  nuts = await nutsRes.json();
  oils = await oilsRes.json();
  seafood = await seafoodRes.json();
  seeds = await seedsRes.json();
  teas = await teasRes.json();
  vegetables = await vegetablesRes.json();
}
init().then(() => {
  
  const dCategory = dq('[data-category]')
const dNames = dq('[data-names]')
  const dValue = dq('[data-value]')
  
  
  
  const categories = [
  {
    name: 'крупы',
    obj: grains
  },
  {
    name: 'бобовые',
    obj: lagumes
  },
  {
    name: 'мясо',
    obj: meat
  },
  {
    name: 'рыба',
    obj: fish
  },
  {
  name: 'фастфуд',
  obj: fastfood
},
  {
    name: 'молочные продукты',
    obj: dairy
  },
    {
    name: 'овощи',
    obj: vegetables
  },
    {
    name: 'фрукты',
    obj: fruits
  },
  {
    name: 'ягоды',
    obj: berries
  },
  {
    name: 'грибы',
    obj: mushrooms
  },
  {
    name: 'орехи',
    obj: nuts
  },
  {
    name: 'масла',
    obj: oils
  },
  {
  name: 'семена',
  obj: seeds
  },
  {
  name: 'хлеб',
  obj: breads
  },
    {
    name: 'морепродукты',
    obj: seafood
  },
  {
    name: 'чаи',
    obj: teas
  },
  {
  name: 'азиатская кухня',
  obj: asian
  }
]
  
  
      
  categories.forEach((category) => {
  // отрисовка категорий
  
  const th = create('th')
  
  th.innerText = category.name
  th.setAttribute('colspan', category.obj.length)
  th.setAttribute('data-fix', '')
  
  
  dCategory.appendChild(th)
  
    })
    
categories.forEach((category) => {
  
  category.obj.forEach((obj) => {
    
    // отрисовка названий
    
    const th = create('th')
    th.innerText = obj.product
    th.setAttribute('data-fix-d', '')
    th.setAttribute('data-title-u', '')
    dNames.appendChild(th)
    
  })
  
})
  
  params.forEach((e)=>{
    // отрисовка всех строк от params 
    
    const tr = create('tr')
    
    const nameParam = e.name
    let importance = e.importance
    importance = +importance.replace('%', '')
    e.unit
    e.norma
    e.accum
    
    categories.forEach((category)=>{
      category.obj.forEach((obj)=>{
        obj.info.forEach((infoObj)=>{
          if (infoObj.name === nameParam) {
            
            const td = create('td')
            const span = create('span')
            td.appendChild(span)
            
            let value = infoObj.value
            
            if ((value === '') || (value === '0') || (value === '-')) {
              
              span.innerText = ''
              
            } else {
              
              if (value.includes('%')) {
                
                span.innerText = value
                
                value = +value.replace('%', '')
                
                td.style = `--progress: ${value}%; ${colorProcent(value)}`
                
                
              } else {
                
                value = +value
                
                if (infoObj.name === 'Стоимость') {
                  
                  span.innerText = value
                  
                } else {
                  const procent = +((+infoObj.value / +e.norma * 100).toFixed(0))

                span.innerText = `${(value).toFixed(1)} ${procent}%`
                
                td.style = `--progress: ${max100(procent)}%; ${colorProcent(procent)}`
                }
                
                
              }
              
            }
            
            td.classList.add('progress')
            
            tr.appendChild(td)
            
          }
        })
      })
    })
    
    tr.insertAdjacentHTML('afterbegin', `
          <td data-fix-l data-title-l>${e.name}</td>
          <td class='progress' style='--progress: ${importance}%; ${colorProcent(importance)}'>
          
          <span>${importance}%</span>
          
          </td>
          <td>${e.unit}</td>
          <td>${e.norma}</td>
          <td>${e.accum}</td>
    `)
    
    dValue.appendChild(tr)
    
  })
  
  
  let constrProducts = []
  let productGram = []
  if (get('constrProducts')) {
    constrProducts = JSON.parse(get('constrProducts'))

    dq('[data-load]').innerHTML = get('innerHTML')
  } 
  if (get('productGram')) {
  productGram = JSON.parse(get('productGram'))

}
  
  document.addEventListener('click', (event) => {
      const targ = event.target
      
      if (targ.closest('[data-title-u]')) {
        const target = targ.closest('[data-title-u]')
        
        
        if (target.classList.contains('_active')) {
          
          target.classList.remove('_active')
          
          constrProducts = constrProducts.filter(item => item !== target.innerText);
          
          console.log(constrProducts)
          
        } else {
          target.classList.add('_active')
          
          constrProducts.push(target.innerText)
          
          log(constrProducts)
        }
        
        set('constrProducts', JSON.stringify(constrProducts))
        set('innerHTML', dq('[data-load]').innerHTML)
        
      }
      
      if (targ.closest('[data-title-l]')) {
  const target = targ.closest('[data-title-l]')
  
  dqa('[data-title-l]').forEach((e) => {
    
    if (e !== target) {
      
      e.classList.remove('_active')
      
    }
    
  })
  
  
  
  if (target.classList.contains('_active')) {
    target.classList.remove('_active')
  } else {
    target.classList.add('_active')
  }
  
  set('constrProducts', JSON.stringify(constrProducts))
  set('innerHTML', dq('[data-load]').innerHTML)
  
}
      
      if (targ.closest('[data-toggle-constr]')) {
        const target = targ.closest('[data-toggle-constr]')
        const table = dq('[data-constr-container]')
        
  
        // начало конструктора
        if (target.classList.contains('_active')) {
          
  
  
  dq('[data-constr-container]').innerHTML = `
   <table>
     
     <thead>
       <tr data-constr-category>
         <th data-c_fix colspan="5">база</th>
       </tr>
       <tr data-constr-names>
         <th data-c_fix-un>нутриент</th>
         <th data-c_fix-d>значимость 5-10л</th>
         <th data-c_fix-d>ед</th>
         <th data-c_fix-d>норм/сут</th>
         <th data-c_fix-d>аккум</th>
       </tr>
       <tr data-constr-weight>
         <th data-c_fix-g-un>Грамовка</th>
         <th data-c_fix-g></th>
         <th data-c_fix-g></th>
         <th data-c_fix-g></th>
         <th data-c_fix-g></th>
       </tr>
     </thead>
     
     <tbody data-constr-value>
       
     </tbody>
     
   </table>
  `
  
  target.classList.remove('_active')
table.classList.remove('_active')
  
} else {
  
  log(2)
  
  if (constrProducts.length) {
  log(3)
  target.classList.add('_active')
  table.classList.add('_active')
  
  // =========== сердце ========
  
  if (constrProducts.length) {
    
    const dcCategory = dq('[data-constr-category]')
const dcNames = dq('[data-constr-names]')
const dcValue = dq('[data-constr-value]')
const dcWeight = dq('[data-constr-weight]')


// =======================
categories.forEach((category) => {
  
  category.obj.forEach((obj) => {
    
    // отрисовка названий
    
    if (constrProducts.includes(obj.product)) {
      
      const th = create('th')
      th.innerText = obj.product
      th.setAttribute('data-c_fix-d', '')

      dcNames.appendChild(th)
      
    }
    
    
  })
  
})
 // =====================
 
params.forEach((e) => {
  // отрисовка всех строк от params 
  
  const tr = create('tr')
  
  const nameParam = e.name
  let importance = e.importance
  importance = +importance.replace('%', '')
  e.unit
  e.norma
  e.accum
  
  let sum = 0
  let sumProcent = 0
  
  
  categories.forEach((category) => {
    
    category.obj.forEach((obj) => {
      
      if (constrProducts.includes(obj.product)) {
        
      obj.info.forEach((infoObj) => {
        if (infoObj.name === nameParam) {
          
          const td = create('td')
          const span = create('span')
          td.appendChild(span)
          
          
          let value = infoObj.value
          
          
          log(`MAIIIIIIIN value: ${value}`)
          
          if ((value === '') || (value === '0') || (value === '-')) {
            
            span.innerText = ''
            
          } else {
            
            if (value.includes('%')) {
              
              span.innerText = value
              
              value = +value.replace('%', '')
              
              td.style = `--progress: ${value}%; ${colorProcent(value)}`
              
              
            } else {
              
              log(`huiii0 ${value}`)
              
              if (get('constrGram')) {
                
                
                
                log(`hui1 ${value}`)
                
                let constGram = JSON.parse(get('constrGram'))
                
                log(`hui2 ${value}`)
                
                constGram.forEach((e) => {
                  
                  if (e.name === obj.product) {
                    
                    let coof
                    
                    log(`${e.name} === ${obj.product}`)
                    
                    log(`hui3 ${value}`)
                    
                    log(`let coof = ${value} / 100`)

                    
                    coof = e.value / 100
                    
                    log(`${value * coof} = ${value} * ${coof}`)
                    
                value = value * coof
                log(`huiiiiii4 ${value}`)
                
                  } 
                  
                })
                
              }
              
              
              
                
                log(`huiii5 ${value}`)
              
              value = +(+value).toFixed(1)
              
              sum = sum + value
              
              log(`summmm = sum+ value ${sum}`)
              
              if (infoObj.name === 'Стоимость') {
                
                span.innerText = value
                
              } else {
                const procent = +((+value / +e.norma * 100).toFixed(0))
                
                sumProcent = sumProcent + procent
                
                span.innerText = `${(value).toFixed(1)} ${procent}%`
                
                td.style = `--progress: ${max100(procent)}%; ${colorProcent(procent)}`
              }
              
              
            }
            
          }
          
          td.classList.add('progress')
          
          tr.appendChild(td)
          
          
        }
      })
      
      }
    })
  })
  
  tr.insertAdjacentHTML('afterbegin', `
          <td data-c_fix-l data-title-l>${e.name}</td>
          <td class='progress' style='--progress: ${importance}%; ${colorProcent(importance)}'>
          
          <span>${importance}%</span>
          
          </td>
          <td>${e.unit}</td>
          <td>${e.norma}</td>
          <td>${e.accum}</td>
    `)
    
  sum = +sum.toFixed(1)
  sumProcent = +sumProcent.toFixed(0)
  
  const spanFR = create('span')
  
  const fullResult = create('td')
  spanFR.innerText = `${sum} ${sumProcent}%`
  fullResult.classList.add('progress')
  
  
  
  fullResult.style = `--progress: ${max100(sumProcent)}%; ${colorProcent(sumProcent)}`
  
  fullResult.appendChild(spanFR)
  tr.appendChild(fullResult)
  dcValue.appendChild(tr)
  
})
    
  // ====================
    categories.forEach((category) => {
  // отрисовка категорий
  
  let x = 0
    
    category.obj.forEach((obj) => {
        
        if (constrProducts.includes(obj.product)) 
          {
            const thWeight = create('th')
            
            let g = 100
            
            if(get('constrGram')) {
              
              JSON.parse(get('constrGram')).forEach((e) => {
                
                if (e.name === obj.product) {
                  g = e.value
                } 
                
              })
                
              
              
            }
            
          thWeight.innerText = g
          thWeight.setAttribute('data-constr-name', obj.product)
          thWeight.setAttribute('data-c_fix-g', obj.product)

          dcWeight.appendChild(thWeight)

            x++
          }
    })
    
    log(x)
  
  if (x) {
    
    const th = create('th')

th.innerText = category.name
th.setAttribute('colspan', x)
th.setAttribute('data-c_fix', '')
dcCategory.appendChild(th)

    
  }
  
  
  
})
    // ====================
    
    
    const resultsTitle = create('th')
    resultsTitle.innerText = 'итог'
    resultsTitle.setAttribute('data-c_fix-d', '')
    
    const emptyDecor = create('th')
emptyDecor.innerText = ''
emptyDecor.setAttribute('data-c_fix', '')
    
    dcNames.appendChild(resultsTitle)
    dcCategory.appendChild(emptyDecor)
    
    let sumWeightNum = 0
    dqa('[data-constr-name]').forEach((weight) => {
      sumWeightNum = sumWeightNum + +weight.innerText
    })
    
    const sumWeight = create('th')
    sumWeight.innerText = sumWeightNum
    sumWeight.setAttribute('data-sum-weight', '')
    sumWeight.setAttribute('data-c_fix-g', '')
    
    dcWeight.appendChild(sumWeight)
    
  } 
  
  
  
  }
  
}
  
  set('constrProducts', JSON.stringify(constrProducts))
  set('innerHTML', dq('[data-load]').innerHTML)
  
      }
      
      // ====¢=€{{€{¢{¢{{¢}
      
      if (targ.closest('[data-constr-name]')) {
  const target = targ.closest('[data-constr-name]')
  
  const targetProduct = target.getAttribute('data-constr-name')
      
  
      let reNum = +prompt('грамовка', target.innerText)
      
      if (!Number.isFinite(reNum) || reNum <= 0) return 
      
      
        
      reNum = Number(reNum);
        
        
      

      target.innerText = reNum
      
      
      
      
      
      log(`========> ${targetProduct}`)
      
      dq('[data-constr-value]').innerHTML = ''
      
      // ======== тот же парамс
      
      const dcCategory = dq('[data-constr-category]')
const dcNames = dq('[data-constr-names]')
const dcValue = dq('[data-constr-value]')
const dcWeight = dq('[data-constr-weight]')
      
      
      params.forEach((e) => {
  // отрисовка всех строк от params 
  
  const tr = create('tr')
  
  const nameParam = e.name
  let importance = e.importance
  importance = +importance.replace('%', '')
  e.unit
  e.norma
  e.accum
  
  let sum = 0
  let sumProcent = 0
  
  
  categories.forEach((category) => {
    
    category.obj.forEach((obj) => {
      
      if (constrProducts.includes(obj.product)) {
        
        
        
        
        
      obj.info.forEach((infoObj) => {
        if (infoObj.name === nameParam) {
          
          const td = create('td')
          const span = create('span')
          td.appendChild(span)
          
          
          let value = infoObj.value
          
          if ((value === '') || (value === '0') || (value === '-')) {
            
            span.innerText = ''
            
          } else {
            
            if (value.includes('%')) {
              
              span.innerText = value
              
              value = +value.replace('%', '')
              
              td.style = `--progress: ${value}%; ${colorProcent(value)}`
              
              
            } else {
              
              log(`
                  ${targetProduct} === ${obj.product}
              `)
              
            if (targetProduct === obj.product) {
              
  let coof = reNum / 100
  value = value * coof
  log('yesss')
            }
              
              value = +(+value).toFixed(1)
              
              
              
              sum = sum + value
              
              if (infoObj.name === 'Стоимость') {
                
                span.innerText = value
                
              } else {
                const procent = +((+value / +e.norma * 100).toFixed(0))
                
                
                
                sumProcent = sumProcent + procent
                
                span.innerText = `${(value).toFixed(1)} ${procent}%`
                
                td.style = `--progress: ${max100(procent)}%; ${colorProcent(procent)}`
              }
              
              
            }
            
          }
          
          td.classList.add('progress')
          
          tr.appendChild(td)
          
          
        }
      })
      
      }
    })
  })
  
  tr.insertAdjacentHTML('afterbegin', `
          <td data-fix-l data-title-l>${e.name}</td>
          <td class='progress' style='--progress: ${importance}%; ${colorProcent(importance)}'>
          
          <span>${importance}%</span>
          
          </td>
          <td>${e.unit}</td>
          <td>${e.norma}</td>
          <td>${e.accum}</td>
    `)
    
  sum = +sum.toFixed(1)
  sumProcent = +sumProcent.toFixed(0)
  
  const spanFR = create('span')
  
  const fullResult = create('td')
  spanFR.innerText = `${sum} ${sumProcent}%`
  fullResult.classList.add('progress')
  
  
  
  fullResult.style = `--progress: ${max100(sumProcent)}%; ${colorProcent(sumProcent)}`
  
  fullResult.appendChild(spanFR)
  tr.appendChild(fullResult)
  dcValue.appendChild(tr)
  
})
    
      let newSum = 0
      dqa('[data-constr-name]').forEach((name) => {
        
        newSum = +name.innerText + newSum
        
      })
      
      dq('[data-sum-weight]').innerText = newSum
      
      set('constrProducts', JSON.stringify(constrProducts))
      set('innerHTML', dq('[data-load]').innerHTML)
      
      
      
      if (get('constrGram')) {
        
        let obj = {
        name: targetProduct,
        value: reNum
      }
      
      let old = JSON.parse(get('constrGram'))
      
      log(`olddddddd ${old}`)
      
      let error = 0
      
      old.forEach((e) => {
        
        log(`###### if ( ${e.name} === ${targetProduct}`)
        
        if (e.name === targetProduct) {
          error = error + 1
          
          log(`QqqQwwwwwwwq ${reNum}`)
          e.value = reNum
          log(e.value)
          log(`e.value ${e.value} = reNum ${reNum}`)
          
        }
        
      })
      
      log(`##########ERROR: ${error}`)
      
      
      if (error === 0) {
        
        log(`///olddddd ${old}`)
        log(old)
        log(`///objjjjjj ${obj}`)
        log(obj)
        
        old.push(obj)
        
        log(`newwwwwwObjjj ${old}`)
        log(old)

      set('constrGram', JSON.stringify(old))
        
      } else {
        
        // этот обьект есть его нужно перезаписать !!! внизу все не верное
        
        

set('constrGram', JSON.stringify(old))
        
      }
      
      
      } else {
        
        let obj = [{
        name: targetProduct,
        value: reNum
      }]
      
      set('constrGram', JSON.stringify(obj))
      
      log(obj)
      log(777777777)
        
        
      }
      
      
  
      }
      
      
      if (targ.closest('[data-reset]')) {
  const target = targ.closest('[data-reset]')
  
  target.classList.add('_active')
  clear()
  
  

      }

    })

})




