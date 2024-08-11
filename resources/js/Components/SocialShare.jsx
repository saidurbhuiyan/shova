import React from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon
} from 'react-share';

export default function SocialShare({ url, title }) {
    return (
        <div className="flex">
            <div className="flex items-center border">
            <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                     stroke="currentColor" className="w-8 h-8 p-2">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"/>
                </svg>
                <span className="border-l py-2 px-4">
            Share
        </span>
            </div>
            <div className="flex items-center border-l p-2">
                <FacebookShareButton url={url} quote={title} className="focus:outline-none">
                    <FacebookIcon size={24} round/>
                </FacebookShareButton>
            </div>
            <div className="flex items-center border-l p-2">
                <TwitterShareButton url={url} title={title} className="focus:outline-none">
                    <TwitterIcon size={24} round/>
                </TwitterShareButton>
            </div>
            <div className="flex items-center border-l p-2">
                <LinkedinShareButton url={url} title={title} summary={title} source={url}
                                     className="focus:outline-none">
                    <LinkedinIcon size={24} round/>
                </LinkedinShareButton>
            </div>
        </div>
        </div>
);
};
