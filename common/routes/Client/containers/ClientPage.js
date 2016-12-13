import { provideHooks } from 'redial'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadClient } from '../actions'
import { StyleSheet, css } from 'aphrodite'
import Helmet from 'react-helmet'
import NotFound from '../../../components/NotFound'
import { selectCurrentClient } from '../reducer'

const redial = {
  fetch: ({ dispatch, params: { slug } }) => dispatch(loadClient(slug))
}

const mapStateToProps = state => selectCurrentClient(state)

const ClientPage = ({ name, pricingRules, isLoading, error }) => {
  if (!error) {
    return (
      <div>
        <Helmet title={name} />
        {isLoading &&
          <div>
            <h2 className={css(styles.loading)}>Loading....</h2>
          </div>}
        {!isLoading &&
          <div>
            <h2 className={css(styles.title)}>{name}</h2>
            
            {pricingRules.map((item, i) => (
            <p className={css(styles.content)}><b>Reduction Type:</b> {item.type}, <b>Plan:</b> {item.plan}</p>
            ))}
          </div>}
      </div>
    )
  } else {
    // maybe check for different types of errors and display appropriately
    return <NotFound />
  }
}

ClientPage.propTypes = {
  name: PropTypes.string,
  pricingRules: PropTypes.array,
  isLoading: PropTypes.bool,
  error: PropTypes.object
}

const styles = StyleSheet.create({
  content: {
    fontSize: '1rem',
    lineHeight: '1.5',
    margin: '1rem 0',
    color: '#555'
  },
  title: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#000'
  },
  loading: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7'
  }
})

export default provideHooks(redial)(connect(mapStateToProps)(ClientPage))
