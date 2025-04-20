import React from 'react';


function AdminlteLayout() {
    return (
        <AdminLTE title={["AdminLTE", "3"]} titleShort={["A", "3"]} theme="blue">
            <Sidebar>
                <Sidebar.Menu>
                    <NavItem icon="fa-th" name="Dashboard" to="/" />
                </Sidebar.Menu>
            </Sidebar>

            <Content>
                <ContentHeader title="Dashboard" />
                <Row>
                    <Col xs={12}>
                        <Box title="Welcome">
                            Welcome to AdminLTE in React!
                        </Box>
                    </Col>
                </Row>
            </Content>
        </AdminLTE>
    );
}

export default AdminlteLayout;