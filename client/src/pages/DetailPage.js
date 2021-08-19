import React, {useCallback, useContext, useEffect, useState} from "react";
import "materialize-css";
import {useParams} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../component/Loader";
import {useHttp} from "../hooks/http.hook";

export const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [link, setLink] = useState(null)
    const linkId = useParams().id

    // method downloader link
    const getLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                // authorization
                Authorization: `Bearer ${token}`
            })
            setLink(fetched)
        } catch (e) {}
    }, [token, linkId, request])

    useEffect(() => {
        getLink()
    }, [getLink])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            { !loading && link && <LinkCard /> }
        </>
    );
}

