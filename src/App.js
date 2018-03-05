import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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


class App extends Component {
  constructor() {
    super();
    /**
     * @type {object}
     * @property {array} data The data that comes from the REST API
     * @property {boolean} open Toggling Dialog Box for Create
     * @property {boolean} openDelete Toggling Dialog Box for Delete
     * @property {boolean} openUpdate Toggling Dialog Box for Update
     * @property {string} name Full Name
     * @property {int} age Age
     * @property {int} id Id
     */
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

/**
     * Toggler for Delete Dialog Box - Open
     * @param {int} pid Id
     * @param {string} pname Name
     * @param {int} page Age
     */
handleDeleteOpen(pid, pname, page){
    this.setState({
        openDelete: true,
        id: pid,
        name: pname,
        age: page
    });
};

/**
     * Toggler for Delete Dialog Box - Close
     */
handleDeleteClose(){
    this.setState({openDelete: false});
};

/**
     * Toggler for Delete Dialog Box - Close by Submitting
     */
handleDeleteSubmitClose(){

    console.log("handleDeleteSubmitClose is running")
    console.log("this.state.id")
    console.log(this.state.id)

    axios.post('https://springcrudapp.herokuapp.com/deletes' , {
        "id": this.state.id,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });        
      
    this.setState({openDelete: false});
    window.location.reload()
};
/**
     * Toggler for Update Dialog Box - Open
     * @param {int} pid Id
     * @param {string} pname Name
     * @param {int} page Age
     */
handleUpdateOpen(pid, pname, page){
    this.setState({
        openUpdate: true,
        id: pid,
        name: pname,
        age: page
    });
};

/**
     * Toggler for Update Dialog Box - Close
     */
handleUpdateClose(){
    this.setState({openUpdate: false});
};

/**
     * Toggler for Update Dialog Box - Close By Submitting
     */
handleUpdateSubmitClose(){
    axios.post('https://springcrudapp.herokuapp.com/updates', {
        "id": this.state.id,
        "name": this.state.name,
        "age": this.state.age
      })
      .then((response) => {
        console.log("response of HandleUpdateSubmitClose - Main Page")
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    
    this.setState({openUpdate: false});
    window.location.reload()
}

/**
     * Saving the name to the State Object
     * @param {Synthetic Event} event
     */
handleNameChange(event){
    this.setState({
        name: event.target.value,
    });
}

/**
     * Saving the age to the State Object
     * @param {Synthetic Event} event
     */
handleAgeChange(event){
    this.setState({
        age: event.target.value
    })
}

/**
     * Toggler for Create Dialog Box - Open
     */
handleOpen(){
    this.setState({open: true});
};

/**
     * Toggler for Create Dialog Box - Close
     */
handleClose(){
    this.setState({open: false});
};

/**
     * Toggler for Create Dialog Box - Close by Submitting
     */
handleSubmitClose(){
    axios.post('https://springcrudapp.herokuapp.com/creates', {
        "name": this.state.name,
        "age": this.state.age
      })
      .then((response) => {
        console.log("response of HandleSubmitClose - Main Page")
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    
    this.setState({open: false});
    window.location.reload()
}

/**
     * Default Lifecycle of React
     */
componentWillMount(){
    axios.get('https://springcrudapp.herokuapp.com/students')
    .then( (response) => {
        console.log('Response on ComponentWillMount')
        console.log("response")
        console.log(response)
        console.log("response.data")
        console.log(response.data)
        // console.log("JSON.parse(example)")
        // console.log(JSON.parse(response.data))
        this.setState({ data: response.data});
    })
    .catch( (error) => {
        console.log(error);
    });
}

/**
     * TextField for Creating new Data
     * @return {ReactElement} Name Field and Age Field
     */
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

/**
     * Text for Deleting new Data
     * @return {ReactElement} Text
     */
deleteData(){
    return(
        <h4>Do you really want to delete? </h4>
    )
}

/**
     * TextField for Updating new Data
     * @return {ReactElement} Name Field and Age Field
     */
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

/**
     * Function for Organizing Data on the Table
     * @return {Array} Table Data in the form of array
     */
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

/**
     * Default Render Method of React
     * @return {ReactElement} HTML Codes
     */
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
