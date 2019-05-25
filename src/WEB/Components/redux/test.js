let arr = [{
    idx : 1
},{
    idx : 2
},
{
    idx : 3
}]

arr.forEach((element,index,array) => {
    if(element.idx === 1){
        array.splice(index,1)
        array.push({
            idx : 1
        })
    }
})

console.log(arr)