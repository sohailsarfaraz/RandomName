import React from 'react';
import './RandomName.css';

class RandomName extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          nameList: [],
          pickedList: []
        };
        this.inputRef = React.createRef();
    }
    handleClick = (event) => {
        if(this.inputRef.current.value == '') return;
      const {nameList} = this.state;
      nameList.push(this.inputRef.current.value);
      this.inputRef.current.value = '';
      this.setState({nameList});
    }
    removeName = (index) => {
        const {nameList} = this.state;
        nameList.splice(index,1);
        this.setState({nameList});
    }
    pickedName = (value) => {
        const {pickedList} = this.state;
        let name = this.getRandomName();
        if(name && name != ''){
            pickedList.push(name);
            this.setState({pickedList});
        }else{
            this.setState({});
        }
    }
    getRandomName = () => {
        const{nameList, pickedList} = this.state;
        for(let i=0; i< nameList.length; i++){
            let name = nameList[Math.floor(Math.random() * Math.floor(nameList.length))];
            if(pickedList.indexOf(name) == -1){
                return name;
            }
        }        
      }
  
    render() {
        const{nameList, pickedList} = this.state;
      return (
          <div>
                
                    <ul className='nameList'>
                        <li>
                            <div style={{display: 'flex', margin: 20}}>
                                <span style={{minWidth: 200}}>Selected Names</span>
                                <button onClick={this.pickedName} className='btnStyle'>
                                    Pick A Name
                                </button>
                            </div>
                        </li>
                        {pickedList.map((item, index) =>
                            <li>
                                <span key={index} style={{margin: '0px 10px', minWidth: 200}}>{item}</span>
                            </li>
                        )}

                    </ul>           
                
                <ul className='nameList'>
                    <li>
                        <div style={{display: 'flex'}}>
                            <input type="text" ref={this.inputRef} className='inputStyle'></input>
                            <button onClick={this.handleClick} className='btnStyle'>
                                Add Name
                            </button>
                        </div>
                    </li>
                    {nameList.map((item, index) => 
                        <li key={index}>
                            <span style={{margin: '0px 10px', minWidth: 200}}>{item}</span>
                            <button onClick={() => this.removeName(index)}> Remove </button>
                        </li>
                    )}

                </ul>
                
          </div>
      );
    }
  }

  export default RandomName