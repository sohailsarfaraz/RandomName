import React from 'react';

class RandomName extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          nameList: [],
          pickedList: []
        };
        this.inputRef = React.createRef();
    }
    // WARNING: this syntax is experimental!
    // Using an arrow here binds the method:
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
              <div style={{display: 'flex', margin: 20}}>
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    <button onClick={this.pickedName}>
                        Pick A Name
                    </button>
                    <span style={{minWidth: 150}}>Selected Names</span>

                  </div>
                    <ul>
                        {pickedList.map((item, index) =>
                            <li>
                                <span key={index} style={{margin: '0px 10px', minWidth: 200}}>{item}</span>
                            </li>
                        )}

                    </ul>
                    
                </div>
                <div style={{display: 'flex', margin: 20}}>
                    <input type="text" ref={this.inputRef}></input>
                    <button onClick={this.handleClick}>
                        Add Name
                    </button>
                </div>
                
                <ul>
                    {nameList.map((item, index) => 
                        <li key={index} style={{display: 'flex', borderBottom: '1px solid grey'}}>
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