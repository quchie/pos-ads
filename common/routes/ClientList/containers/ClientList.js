import { provideHooks } from 'redial'
import React, { PropTypes } from 'react'
import { loadClients } from '../actions'
import { connect } from 'react-redux'
import ClientListItem from '../components/ClientListItem'
import { StyleSheet, css } from 'aphrodite'
import Helmet from 'react-helmet'
import { selectClient } from '../reducer'

const redial = {
  fetch: ({ dispatch }) => dispatch(loadClients())
}

const mapStateToProps = state => ({
  clients: selectClient(state)
})

const ClientListPage = ({ clients }) => (
  <div className={css(styles.root)}>
    <Helmet title='Clients' />
    {clients.isLoading &&
      <div>
        <h2 className={css(styles.title)}>Loading....</h2>
      </div>}
    {!clients.isLoading &&
      clients.data.map((client, i) => <ClientListItem key={client.name} client={client} />)}
  </div>
)

ClientListPage.PropTypes = {
  clients: PropTypes.array.isRequired
}

const styles = StyleSheet.create({
  root: {
    maxWidth: 500
  },
  title: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7'
  }
})

export default provideHooks(redial)(connect(mapStateToProps)(ClientListPage))
