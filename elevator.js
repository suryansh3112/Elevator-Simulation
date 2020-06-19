const data=require('./config');
const rl = require('readline');
const prompt=rl.createInterface(process.stdin,process.stdout);


const Lift = data.Lift;
const User = data.User; 

function display(u,l){
    console.log('\n\n')
    console.log('                         User                         Lift      ');
    console.log("current Floor :         "+u.currentFloor     +'                                '+l.currentFloor  );
    console.log("status        :         "+u.status           +'                  '+l.status  );
    console.log("Direction     :         "+u.selectedDirection+'                                '+l.direction  );
    console.log("Target Floor  :         "+u.targetFloor      +'                                '+l.destination ); 
    
    
}

function movePerson(message,coefficient){
    
        Lift.direction=message;
        const t = setInterval(()=>{
            if(User.currentFloor!==User.targetFloor){
                Lift.currentFloor+=coefficient;
                User.currentFloor+=coefficient;
                display(User,Lift);
            }
            else{
                clearInterval(t);
                console.log('------------------------------------------------------------------');
                console.log('---------------------------REACHED '+User.targetFloor+' FLOOR------------------------');
                console.log('------------------------------------------------------------------');
                reset();
                start();
            }
        },1000)
    
    
}

function reset(){
    User.selectedDirection='';
    User.targetFloor=Lift.destination="";
    User.status='outside-the-Lift'
    Lift.currentFloor=5;
    Lift.direction='';
    Lift.status='idle'        

}

function openClose(){
    const t = setTimeout(()=>{
        console.log('------------------------------------------------------------------');
        console.log('--------------------------LIFT-GATE-CLOSE-------------------------');
        console.log('------------------------------------------------------------------');

        prompt.question('Enter the floor number(1-10) : ',(n)=>{
            User.targetFloor=Lift.destination=parseInt(n);                        
            User.status='inside-the-Lift';
            if (User.currentFloor<User.targetFloor){
                movePerson('moving up',1);
            }
            else{
                movePerson('moving down',-1);
            }   
        })
    },3000);

    console.log('------------------------------------------------------------------');
    console.log('--------------------------LIFT-GATE-OPEN--------------------------');
    console.log('------------------------------------------------------------------');
}


function moveLift(des,message,add){
    
    
        Lift.direction=message;
        const t = setInterval(()=>{
            if(Lift.currentFloor!==des){
                Lift.currentFloor+=add;
                display(User,Lift);
            }
            else{
                clearInterval(t);
                openClose();               
            }
        },1000);
    
    
}

function start(){
    display(User ,Lift);
    prompt.question('Enter direction(up/down) :',(res)=>{

        User.selectedDirection=res;
        Lift.destination=User.currentFloor;
        Lift.status='running';
        User.status='waiting';
        display(User,Lift);
        
        if(Lift.currentFloor>User.currentFloor){
            moveLift(User.currentFloor,'moving down',-1);
        }
        else{
            moveLift(User.currentFloor,'moving up',1);
        }
        
        
    })
}

start();


