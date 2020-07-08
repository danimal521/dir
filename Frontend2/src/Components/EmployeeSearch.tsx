import React, { FunctionComponent } from "react";
import { Stack, IStackItemStyles, DefaultButton, IStackStyles, DocumentCard, Label, PrimaryButton, Panel, TextField, MaskedTextField, Spinner, SpinnerSize } from "office-ui-fabric-react";
import Employee from "../Models/Employee";

interface IEmployeeSearch {
    m_bShowSpinner: boolean,
    m_bShowResult: boolean,
    m_strSearch: string,
    m_Employee: Employee,
    m_aEmployee: Employee[],
    m_bEditOpen: boolean
}

const itemStyles: React.CSSProperties = {
    alignItems: 'start',
    display: 'flex',
    justifyContent: 'start',
    width: 150,
    padding: 10
};

const lblStyle: React.CSSProperties = {
    fontSize: 20
};

const pnlStyle: React.CSSProperties = {
    margin: 5,
    width: 200
};

export default class EmployeeSearch extends React.Component<{}, IEmployeeSearch>
{
    constructor(props: Readonly<{}>) {
        super(props);

        this.state =
        {
            m_strSearch: "",
            m_bShowSpinner: false,
            m_bShowResult: false,
            m_Employee: new Employee,
            m_aEmployee: new Array(),
            m_bEditOpen: false
        };
    }

    SearchChange = (event: { target: { value: any; }; }) => {
        this.setState({ m_strSearch: event.target.value });
    }

    RenderWait() {
        if (this.state.m_bShowSpinner)
            return <Spinner size={SpinnerSize.large} />
    }

    Search() {
        this.setState({ m_bShowSpinner: true, m_bShowResult: false });

        fetch('http://localhost:7071/api/Search?Query=' + this.state.m_strSearch)
            .then(res => res.json())
            .then(res => {              
                this.setState({ m_aEmployee: res, m_bShowSpinner: false, m_bShowResult: true });
            });

    }

    ShowEdit(e: Employee)
    {
        this.setState({ m_Employee: e, m_bEditOpen: true});
    }

    RenderEmployee(e: Employee)
    {
        return <Stack horizontal>
            <Label style={itemStyles}>{e.first_name}</Label>
            <Label style={itemStyles}>{e.last_name}</Label>
           
            <PrimaryButton text="Edit" onClick={() => this.ShowEdit(e)}  allowDisabledFocus />
        </Stack>
    }

    CloseEdit()
    {
        this.setState({m_bEditOpen: false});
    }

    Save()
    {
        // let v: Bike = this.state.m_SelectedBike;
        // v.quantity = this.state.m_nNewQuantity;

        // fetch("http://localhost:7071/api/Bike", {
        //     method: 'post',
        //     body: JSON.stringify(v)
        // }).then(res => {
        //     window.location.href = '/';
        // }).catch(error => alert('Error! ' + error.message));

        this.setState({m_bEditOpen: false});
    }


    RenderReport() {
        if (this.state.m_bShowResult)
            return <Stack>

                <Label style={lblStyle}> {this.state.m_Employee.firstName}</Label>

                
                <br></br>
                <Label style={lblStyle}> {this.state.m_Employee.lastName}</Label>


                <Stack>
                    {this.state.m_aEmployee.map(v => this.RenderEmployee(v))}
                </Stack>



            </Stack>
    }

    render() {
        return (
            <Stack padding={10}>

                <Label style={lblStyle}>Search Employee</Label>
                <TextField style={pnlStyle} label="Search" onChange={this.SearchChange.bind(this)} value={this.state.m_strSearch} />
                <Stack horizontal>
                    <PrimaryButton style={pnlStyle} text="Search" onClick={() => this.Search()} allowDisabledFocus />
                    {this.RenderWait()}
                </Stack>

                {this.RenderReport()}

                <Panel
                        headerText={this.state.m_Employee.first_name + " " + this.state.m_Employee.last_name }
                        isOpen={this.state.m_bEditOpen}                        
                        closeButtonAriaLabel="Close">
                        <Stack>

                             {/* <TextField style={pnlStyle} label="Quantity" onChange={this.QuantityChange.bind(this)} value={this.state.m_nNewQuantity} /> */}
                            <PrimaryButton style={pnlStyle} text="Save" onClick={() => this.Save()} allowDisabledFocus />
                            <PrimaryButton style={pnlStyle} text="Close" onClick={() => this.CloseEdit()} allowDisabledFocus /> 
                        </Stack>
                    </Panel>
            </Stack>
        );
    }
}
