import React, { FunctionComponent } from "react";
import { Stack, IStackItemStyles, DefaultButton, IStackStyles, DocumentCard, Label, PrimaryButton, Panel, TextField, MaskedTextField, Spinner, SpinnerSize } from "office-ui-fabric-react";
import Employee from "../Models/Employee";

interface IEmployeeSearch {
    m_bShowSpinner: boolean,
    m_bShowResult: boolean,
    m_strSearch: string,
    m_Employee: Employee
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
            m_Employee: new Employee
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

        fetch('http://localhost:7071/api/Employee')
            .then(res => res.json())
            .then(res => {
              
                this.setState({ m_Employee: res, m_bShowSpinner: false, m_bShowResult: true });
            });

    }

    RenderReport() {
        if (this.state.m_bShowResult)
            return <Stack>

                <Label style={lblStyle}> {this.state.m_Employee.firstName}</Label>

                
                <br></br>
                <Label style={lblStyle}> {this.state.m_Employee.lastName}</Label>




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
            </Stack>
        );
    }
}
