import React, { Component } from 'react'
import { randomBytes } from 'crypto';

export default class Items extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            table: [],
            grandTotal: 0,
            items: []
        }
    }

    onClickHandler = () => {
        let count = this.state.count;
        let table = this.state.table;
        let id = 'REF'+Math.round(Math.random()*999);
        let tr = (
                <tr key={++count}>
                    <td className="table-no">{id}</td>
                    <td><input id={`name${count}`} /></td>
                    <td><input id={`price${count}`} /></td>
                    <td><input id={`quantity${count}`} /></td>
                    <td id={`total${count}`} className="table-single-total">$0.00</td>
                    <td className="add-rem">
                        <span id={`save${count}`} onClick={() => this.onItemSave(count, id)} className="table-add"><i className='fas fa-save'></i></span>
                        <span id={`rem${count}`} onClick={() => this.onItemRem(id)} className="table-rem"><i className='fas fa-minus-circle' style={{fontSize: '10pt'}}></i></span>
                    </td>
                </tr>
            )
        table.push(tr)
        this.setState({count, table});
    }

    renderTable = () => {
        let table = this.state.table;
        return table.length === 0? null: table.map(tr => tr);
    }

    onItemSave = (index, uid) => {
        let name = document.getElementById('name'+index);
        let price = document.getElementById('price'+index);
        let quantity = document.getElementById('quantity'+index);
        let save = document.getElementById('save'+index);
        let rem = document.getElementById('rem'+index);
        let total = document.getElementById('total'+index);
        let message = document.getElementById('table-message');             
        let items = this.state.items;
        let grandTotal = 0;
        
        if(name.value === '' || price.value === '' || quantity.value === '')
            message.innerHTML = 'Cannot be empty!';
        else {
            message.innerHTML = '';
            if((items.filter((item)=> {
                if(item[0] === name.value) {
                    message.innerHTML = 'Already exists!';
                    return [];
                }
            })).length !== 0) return;
            items.push([uid, name.value, price.value, quantity.value]);

            total.innerHTML = '$'+(price.value*quantity.value).toFixed(2);
            save.style.display = 'none';
            rem.style.display = 'block';

            //DISABLE INPUTS
            name.disabled = true;
            price.disabled = true;
            quantity.disabled = true;
            grandTotal = items.reduce((prev, curr) => prev + (curr[2]*curr[3]), 0);
            this.setState({items, grandTotal});
        }
    }

    onItemRem = (id) => {
        let table = this.state.table;
        let items = this.state.items;
        for(let i=0; i<items.length; i++) {
            if(items[i][0] === id) {
                items.splice(i, 1);
                table.splice(i, 1);
                break;
            }
        }
        let grandTotal = items.reduce((prev, curr) => prev + (curr[2]*curr[3]), 0);
        this.setState({table, items, grandTotal});
    }

    render() {
        return (
            <div className="table-container">
                <table cellSpacing="0.95px">
                    <tbody>
                        <tr>
                            <th className="table-no">UID</th>
                            <th className="table-name">Name</th>
                            <th className="table-price">Price</th>
                            <th className="table-quantity">Quantity</th>
                            <th className="table-total">Total</th>
                            <th className="table-action">Action</th>
                        </tr>
                        {this.renderTable()}
                        <tr>
                            <td id="table-message" className="table-message" colSpan="4">
                                <span className="table-add" style={{fontSize: '1.4vh'}}>Hint: click on <i className='fas fa-save'></i> to update changes</span>
                            </td>
                            <td className="grand-total">${this.state.grandTotal.toFixed(2)}</td>
                            <td onClick={this.onClickHandler} className="table-add-btn">Add New</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
