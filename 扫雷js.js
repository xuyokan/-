

function renderBoard(NumRows,NumCols,grid){                               //行数，列数，初始化的棋盘
    let boardElement=document.querySelector("#board");//扫雷棋盘
    
    for (let i=0; i < NumRows; i++){                
        let trElement=document.createElement("tr"); 
        
        for (let j=0; j < NumCols; j++){
            let tdElement=document.createElement("td");         //生成表格
            
            let Gezi=document.createElement("div");             //通过给div元素赋予类名后使用css生成格子   
            Gezi.className=("Gezi");
            grid[i][j].Gezi=Gezi;
            //Gezi.innerText=grid[i][j].count;
            
            
            
            
            Gezi.addEventListener("click",(e)=> {

                if (grid[i][j].count===-1){
                    explode(grid,i,j,NumRows,NumCols)
                    return;
                }

                if (grid[i][j].count===0){
                    searchClearArea(grid,i,j,NumRows,NumCols);                   //搜索当前点击点i,j周围的安全区域

                }else if(grid[i][j].count>0){
                    grid[i][j].clear=true;
                    Gezi.classList.add("clear");
                    grid[i][j].Gezi.innerText=grid[i][j].count;

                }
                checkAllClear(grid);

                
                //Gezi.classList.add("clear");
            
            
            });

            tdElement.append(Gezi);
            
            trElement.append(tdElement);                        //将生成的div元素装入td中，再将td 装入tr， 最后将tr装入棋盘中 
        }

        boardElement.append(trElement);
    }
    console.log("grid:",grid);
}
//扫雷棋盘主要部分

const directions=[
    [-1,-1],[-1,0],[-1,1],
    [ 0,-1],      [0, 1],
    [ 1,-1],[1,0],[1, 1],                                         //中心棋子一周的方向常量
]




function Chushihua(NumRows,NumCols,NumLei){
    let grid=new Array(NumRows);              
    
    for (let i=0; i < NumRows; i++) {
        grid[i]=new Array(NumCols);
        
        for (let j=0; j < NumCols; j++){    //给每个格赋0
            grid[i][j]={
                clear:false,
                count:0
            }
        
        }
    
    }
    

    let Lei=[]
    for (let k=0; k < NumLei; k++){
        let LeiNums= Math.trunc(Math.random()*NumRows*NumCols);
        let row=Math.trunc(LeiNums/NumCols);
        let col=LeiNums%NumCols                 //生成[row,col]位置的雷
        
        console.log("zuobiao",LeiNums,row,col)
        grid[row][col].count= -1;
        Lei.push([row,col]);                    //给雷格赋-1，入栈

    }
    console.log("lei:",Lei)



    for (let [row,col] of Lei){
        for (let [drow,dcol] of directions){
            let Gezirow=row + drow;
            let Gezicol=col + dcol;                             //雷格坐标
            
            if (Gezirow < 0 || Gezirow >= NumRows || Gezicol < 0 || Gezicol >= NumCols) {
                continue;                                               //跳出边框
            }
            
            
            if (grid[Gezirow][Gezicol].count===0){
                let count=0;
                for (let [arow,acol] of directions){
                    let NewGezirow=Gezirow+arow;
                    let NewGezicol=Gezicol+acol;                            //雷格一周依次的坐标
                    
                    if (NewGezirow < 0 || NewGezirow >= NumRows || NewGezicol < 0 || NewGezicol >= NumCols){
                        continue;                                            //跳出边框限制条件
                    }
                    
                    if (grid[NewGezirow][NewGezicol].count===-1){
                        count +=1;                                              //判断是否为雷 +1
                    }
                    //console.log("count:",count);
                }
                if (count > 0){
                    grid[Gezirow][Gezicol].count=count;                             //雷格周围的格一周的雷数
                }
            }
            
        }
           

    }




    return grid;

}

function checkAllClear(grid){
    for (let row=0; row < grid.length; row++){
        let gridrow=grid[row];
        for (let col=0; col < gridrow.length;col++ ){
            let gezi1=gridrow[col];
            if (gezi1.count !== -1 && !gezi1.clear){
                return false;
            }

        }
    }

    for (let row=0; row < grid.length; row++){
        let gridrow=grid[row];
        for (let col=0; col < gridrow.length;col++ ){
            let gezi1=gridrow[col];
            if (gezi1.count === -1 ){
                gezi1.Gezi.classList.add("雷");
            }
            gezi1.Gezi.classList.add("成功");

        }
    }
    return true;
}


function searchClearArea(grid,row,col,NumRows,NumCols){
    let gridClera=grid[row][col];
    gridClera.clear=true;
    gridClera.Gezi.classList.add("clear");

    for (let [drow,dcol] of directions){
        let Gezirow=row + drow;
        let Gezicol=col + dcol;                             //搜索点周围一圈的坐标
            
        if (Gezirow < 0 || Gezirow >= NumRows || Gezicol < 0 || Gezicol >= NumCols) {
            continue;                                               //跳出边框
        }

        let gridClear=grid[Gezirow][Gezicol];                    //gridClear搜索点
        if(!gridClear.clear){
            gridClear.clear=true;
            gridClear.Gezi.classList.add("clear")

            if(grid[Gezirow][Gezicol].count===0){
                searchClearArea(grid,Gezirow,Gezicol,NumRows,NumCols);
            }else if (gridClear.count > 0){
                gridClear.Gezi.innerText = gridClear.count;
            }
        }
    }
}
    
function explode(grid,row,col,NumRows,NumCols){
    grid[row][col].Gezi.classList.add("explode");
    for (let Gezirow=0; Gezirow < NumRows ;Gezirow++){
        for (let Gezicol=0;Gezicol < NumCols ;Gezicol++){
            let Gezi=grid[Gezirow][Gezicol];
            Gezi.clear=true;
            Gezi.Gezi.classList.add("clear");

            if (Gezi.count===-1){
                Gezi.Gezi.classList.add("雷");
            }
        }
    }


}


let grid=Chushihua(9,9,1);

renderBoard(9,9,grid);
