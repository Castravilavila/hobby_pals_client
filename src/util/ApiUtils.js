import {API_BASE_URL,ACCESS_TOKEN} from '../constants';


import S3FileUpload from 'react-s3';

export const request = options=>{


    const headers = new Headers({
        'Content-Type':'application/json'
    });

    if(localStorage.getItem(ACCESS_TOKEN)){
        headers.append('Authorization','Bearer '+localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers:headers};
    //Create a single object for comodity
    options = Object.assign({},defaults,options);

    return fetch(options.url,options).then(response=>response.json().then(json=>{
        if(response.status==401){
            localStorage.removeItem("accessToken");}
        if(!response.ok){
            return Promise.reject(json);
        }
        return json;
    }))
};


export function signup(signUpRequest){
    return request({
        url:API_BASE_URL+'/auth/signup',
        method:'POST',
        body:JSON.stringify(signUpRequest)
    })
};

export function login(loginRequest){
    return request({
        url:API_BASE_URL+'/auth/signin',
        method:'POST',
        body:JSON.stringify(loginRequest)
    })
}

export function checkUsernameAvailability(username){
    return request({
        url:API_BASE_URL+'/users/checkUsername?username='+username,
        method:'POST'
    })
}

export function checkEmailAvailability(email){
    return request({
        url:API_BASE_URL+'/users/checkEmail?email='+email,
        method:'POST'
    })
}

export const bucketConfig = {  
    bucketName: 'hobbypalsbucket', 
    region: 'eu-central-1',
    accessKeyId: 'AKIAXCGU6RKFVHLUN2X4', 
    secretAccessKey: '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'}

export function createPost(groupId,post){
    return request({
        url:API_BASE_URL+`/posts/${groupId}`,
        method:'POST',
        body:JSON.stringify(post)
    })
}

export function createGroup(group,categoryId){
    return request({
        url:API_BASE_URL+`/groups/${categoryId}`,
        method:'POST',
        body:JSON.stringify(group)
    })
}

export function createCategory(category){
    return request({
        url:API_BASE_URL+`/categories`,
        method:'POST',
        body:JSON.stringify(category)
    })
}

export function createComment(comment,postId){
    return request({
        url:API_BASE_URL+`/comments/${postId}`,
        method:'POST',
        body:JSON.stringify(comment)
    })
}

export function getPostsByGroupId(groupId,page=0){
    return request({
        url:API_BASE_URL+`/posts/inGroup/${groupId}?page=${page}`,
        method:'GET',
    })
}

export function getGroupsByCategoryId(categoryId,page = 0){
    return request({
        url:API_BASE_URL+`/groups/byCategory/${categoryId}?page=${page}`,
        method:'GET',
    })
}

export function getProfileData(userId){
    return request({
        url:API_BASE_URL+`/users/${userId}`,
        method:'GET',
    })
}

export function getUserResponse(userId){
    return request({
        url:API_BASE_URL+`/users/userResponse/${userId}`,
        method:'GET',
    })
}
export function getGroupsResponse(userId){
    return request({
        url:API_BASE_URL+`/groups/userResponse/${userId}`,
        method:'GET',
    })
}


export function getAllCategories(page = 0){
    return request({
        url:API_BASE_URL+`/categories?page=${page}`,
        method:'GET',
    })
}

export function getCategoryData(categoryId){
    return request({
        url:API_BASE_URL+`/categories/${categoryId}`,
        method:'GET',
    })
}

export function getGroupData(groupId){
    return request({
        url:API_BASE_URL+`/groups/${groupId}`,
        method:'GET',
    })
}

export function getPostData(postId){
    return request({
        url:API_BASE_URL+`/posts/${postId}`,
        method:'GET',
    })
}

export function getCommentsData(postId){
    return request({
        url:API_BASE_URL+`/comments/paginated/${postId}`,
        method:'GET',
    })
}

export function updatePost(postId,postPayload){
    return request({
        url:API_BASE_URL+`/posts/${postId}`,
        method:'PUT',
        body:JSON.stringify(postPayload)
    })}

export function getFollowedGroups(page){
    return request({
        url:API_BASE_URL+`/groups/followedBy/?page=${page}`,
        method:'GET'
    })
}

export function getFollowedCategories(page){
    return request({
        url:API_BASE_URL+`/categories/followedBy/?page=${page}`,
        method:'GET'
    })
}

export function getAllFollowedCategories(){
    return request({
        url:API_BASE_URL+`/categories/followedByList`,
        method:'GET'
    })
}

export function followGroup(groupId){
    return request({
        url:API_BASE_URL+`/users/joinGroup/${groupId}`,
        method:'POST'
    })
}

export function followCategory(categoryId){
    return request({
        url:API_BASE_URL+`/users/followCategory/${categoryId}`,
        method:'POST'
    })

}

export function deletePost(postId){
    return request({
        url:API_BASE_URL+`/posts/${postId}`,
        method:'DELETE'
    })
}

export function leaveGroup(groupId){
    return request({
        url:API_BASE_URL+`/users/leaveGroup/${groupId}`,
        method:'POST'
    })
}

export function deleteGroup(groupId){
    return request({
        url:API_BASE_URL+`/groups/${groupId}`,
        method:'DELETE'
    })
}

export function unfollowCategory(categoryId){
    return request({
        url:API_BASE_URL+`/categories/unfollow/${categoryId}`,
        method:'POST'
    })
}

export function deleteComment(commentId){
    return request({
        url:API_BASE_URL+`/comments/${commentId}`,
        method:'DELETE'
    })
}

export function updateComment(commentId,commentBody){
    return request({
        url:API_BASE_URL+`/comments/update/${commentId}`,
        method:'PUT',
        body:JSON.stringify(commentBody)})
}

export function getPostsFromFollowedCategory(page = 0,userId = -1){
    return request({
        url:API_BASE_URL+`/posts/followedCategories/${userId}?page=${page}`,
        method:'GET'})
}

export function getPostsFromJoinedGroups(page = 0,userId = -1){
    return request({
        url:API_BASE_URL+`/posts/joinedGroups/${userId}?page=${page}`,
        method:'GET'})
}
export function getGroupsData(title, page){
    return request({
        url:API_BASE_URL+`/groups/search/?title=${title}&page=${page}&sortBy=groupTitle`,
        method:'GET'
    })
}

export function getGroupsByUserCategories(title, page){
    return request({
        url:API_BASE_URL+`/groups/searchInUserCategories/?title=${title}&page=${page}&sortBy=groupTitle`,
        method:'GET'
    })}


export function getJoinRequestsByGrouIp(groupId,page=0){
    return request({
        url:API_BASE_URL+`/groups/joinRequests/${groupId}/?page=${page}`,
        method:'GET'
    })
}

export function createJoinRequest(groupId,message){
    return request({
        url:API_BASE_URL+`/groups/joinRequests/${groupId}`,
        method:'POST',
        body:message
    })
}

export function handleJoinRequestAsAdmin(joinRequestId,answer){
    return request({
        url:API_BASE_URL+`/groups/joinRequests/answer/${joinRequestId}/${answer}`,
        method:'POST'
    })
}

export function updateProfilePageImage(userId,imageUrl){
    return request({
        url:API_BASE_URL+`/users/image/${userId}`,
        method:'PUT',
        body:imageUrl
    })
}

export function getUserProfileImage(userId){

    return request({
        url:API_BASE_URL+`/users/image/${userId}`,
        method:'GET',
    })
}
