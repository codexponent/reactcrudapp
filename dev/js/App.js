import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

const styles = {
    title: {
        position: 'center',
        textAlign: 'center'
    },
    leftIcon: {
      cursor: 'default',
      color: 'green'
    },
  };

class App extends React.Component{

    constructor() {
        super();
        this.state = {
          data: [],
          open: false,
          openDelete: false,
          openUpdate: false,
          name: null,
          age: null,
          id: null
        }
        this.displayTableData = this.displayTableData.bind(this)
        this.addData = this.addData.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleAgeChange = this.handleAgeChange.bind(this)
        this.handleSubmitClose = this.handleSubmitClose.bind(this)
        this.deleteData = this.deleteData.bind(this)
        this.updateData = this.updateData.bind(this)
        this.handleUpdateOpen = this.handleUpdateOpen.bind(this)
        this.handleUpdateClose = this.handleUpdateClose.bind(this)
        this.handleUpdateSubmitClose = this.handleUpdateSubmitClose.bind(this)
        this.handleDeleteOpen = this.handleDeleteOpen.bind(this)
        this.handleDeleteClose = this.handleDeleteClose.bind(this)
        this.handleDeleteSubmitClose = this.handleDeleteSubmitClose.bind(this)
    }

    handleDeleteOpen(pid, pname, page){
        this.setState({
            openDelete: true,
            id: pid,
            name: pname,
            age: page
        });
    };
    
    handleDeleteClose(){
        this.setState({openDelete: false});
    };

    handleDeleteSubmitClose(){

        console.log("handleDeleteSubmitClose is running")
        console.log("this.state.id")
        console.log(this.state.id)

        axios.delete('http://localhost:8080/SpringRestHibernate/delete/' + this.state.id)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });        

        this.setState({openDelete: false});
        window.location.reload()
    };

    handleUpdateOpen(pid, pname, page){
        this.setState({
            openUpdate: true,
            id: pid,
            name: pname,
            age: page
        });
    };
    
    handleUpdateClose(){
        this.setState({openUpdate: false});
    };

    handleUpdateSubmitClose(){
        axios.put('http://localhost:8080/SpringRestHibernate/update', {
            "id": this.state.id,
            "name": this.state.name,
            "age": this.state.age
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
        
        this.setState({openUpdate: false});
        window.location.reload()
    }

    handleNameChange(event){
        this.setState({
            name: event.target.value,
        });
    }

    handleAgeChange(event){
        this.setState({
            age: event.target.value
        })
    }

    handleOpen(){
        this.setState({open: true});
    };
    
    handleClose(){
        this.setState({open: false});
    };

    handleSubmitClose(){
        axios.post('http://localhost:8080/SpringRestHibernate/create', {
            "name": this.state.name,
            "age": this.state.age
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
        
        this.setState({open: false});
        window.location.reload()
    }

    componentWillMount(){
        axios.get('http://localhost:8080/SpringRestHibernate/students')
        .then( (response) => {
            console.log(response);
            this.setState({ data: response.data});
        })
        .catch( (error) => {
            console.log(error);
        });
    }

    addData(){
        return (
            <div>
                <TextField
                    hintText="Name"
                    onChange={this.handleNameChange}
                /><br />
                <br />
                <TextField
                    hintText="Age"
                    onChange={this.handleAgeChange}
                /><br />
            </div>
        )
    }

    deleteData(){
        return(
            <h4>Do you really want to delete? </h4>
        )
    }

    updateData(){
        return(
            <div>
                <TextField
                    hintText="Name"
                    onChange={this.handleNameChange}
                    defaultValue = {this.state.name}
                /><br />
                <br />
                <TextField
                    hintText="Age"
                    onChange={this.handleAgeChange}
                    defaultValue = {this.state.age}
                /><br />
            </div>
        )
    }

    displayTableData(){
        const updateActions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleUpdateClose}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleUpdateSubmitClose}
            />,
          ];
        const deleteActions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleDeleteClose}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleDeleteSubmitClose}
            />,
          ];
        let tempArrayList = new Array()

        for (let keys in this.state.data){
            tempArrayList.push(
                <TableRow key={keys} >
                    <TableRowColumn>{this.state.data[keys].id}</TableRowColumn>
                    <TableRowColumn>{this.state.data[keys].name}</TableRowColumn>
                    <TableRowColumn>{this.state.data[keys].age}</TableRowColumn>
                    <TableRowColumn><FlatButton onClick={() => this.handleUpdateOpen(this.state.data[keys].id, this.state.data[keys].name, this.state.data[keys].age)} primary={true} label="Edit" /></TableRowColumn>
                    <Dialog
                        title="Dialog With Actions"
                        actions={updateActions}
                        modal={false}
                        open={this.state.openUpdate}
                        onRequestClose={this.handleUpdateClose}
                        >
                        {this.updateData()}
                        </Dialog>

                    <TableRowColumn><FlatButton onClick={() => this.handleDeleteOpen(this.state.data[keys].id, this.state.data[keys].name, this.state.data[keys].age)} secondary={true} label="Delete" /></TableRowColumn>
                    <Dialog
                        title="Dialog With Actions"
                        actions={deleteActions}
                        modal={false}
                        open={this.state.openDelete}
                        onRequestClose={this.handleDeleteClose}
                        >
                        {this.deleteData()}
                        </Dialog>
                </TableRow>
            )
        }

        return(
            tempArrayList
        )
    }

    render() {

        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleSubmitClose}
            />,
          ];

        return(
            <div>
                <AppBar
                    title={<span style={styles.title} >React CRUD Application</span>}
                    iconElementLeft={<IconButton style={styles.leftIcon} ><NavigationClose /></IconButton>}
                />
                <br />
                <Table>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Age</TableHeaderColumn>
                            <TableHeaderColumn>Edit</TableHeaderColumn>
                            <TableHeaderColumn>Delete</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} >
                        {this.displayTableData()}
                    </TableBody>
                </Table>
                <br />
                {/* <RaisedButton label="Add" onClick={this.addData} primary={true} /> */}
                <RaisedButton label="Add Data" onClick={this.handleOpen} />
                    <Dialog
                    title="Dialog With Actions"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    >
                    {this.addData()}
                    </Dialog>
            </div>
        )
    }
}

export default App;