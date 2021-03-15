import React, { useEffect, useState } from 'react';
import "../../styles/explore/exploregroups.css";
import ExploreCover from '../../images/explore_cover_image.svg';
import GroupCard from './exploregroupcard';
import { Card } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../loading';
import { getGroups,  getSearchResults } from '../../actions/exploreAction';
import { getUserGroup } from '../../actions/groupAction';
import NoMoreGroups from './end';
import { useFormik } from 'formik';

const ExploreGroups = () => {
    const groups = useSelector(state => state.exploreReducer.groups)
    const getGroupPending = useSelector(state => state.exploreReducer.getGroupsPending)
    const dispatch = useDispatch();
    const searchBool = useSelector(state => state.exploreReducer.search)
    const searchGroups = useSelector(state => state.exploreReducer.searchGroups)

    useEffect(() => {
        dispatch(
            getGroups('Home')
        )
    }, [])


    const groupList = () => {
        let list = [];
        if (getGroupPending == false) {
            if (searchBool == false) {
                if (groups.length > 0) {
                    list = groups.map((group) =>
                        <GroupCard group={group} />
                    )
                } else {
                    list = <NoMoreGroups />
                }
            } else {
                if (searchGroups.length != 0) {
                    list = searchGroups.map((group) =>
                        <GroupCard group={group} />
                    )
                }
            }
        } else {
            list = <Loading />
        }

        return (
            list
        )
    }

    const formik = useFormik({
        initialValues: {
            search: '',
        },

        onSubmit: values => {
            dispatch(getSearchResults(values.search))
        }
    })

    return (
        <>
            <div className="explore-search">
                <img src={ExploreCover} className="explore-cover-image" />
                <div className="group-searchbar">
                    <div className="group-search-heading-primary">Find your place on Discord</div>
                    <div className="group-search-heading-secondary">From Movies, to Coding, to Study, there's a place for you.</div>
                    <div className="group-search-input">
                        <form onSubmit={formik.handleSubmit}>
                            <Input
                                className='group-find'
                                placeholder='Search...'
                                name="search"
                                value={formik.values.search}
                                onChange={formik.handleChange}
                            />
                            <button type="submit" className="search-submit">
                                <i class="fas fa-search"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="explore-heading">
                Featured communities
            </div>
            <div className="explore-groups">
                <Card.Group itemsPerRow={5}>
                    {groupList()}
                    {groups.length > 0 ? <NoMoreGroups /> : ''}
                </Card.Group>
            </div>
        </>
    )
}

export default ExploreGroups;