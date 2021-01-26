import {get,post} from './http';
import axios from "axios";

//判断管理员是否登录成功
export const getLoginStatus = (params) => post('admin/login/status',params);

/*--------------歌手相关------------------*/
//查询歌手
export const getAllSinger = () => get('singer/allSinger');

//添加歌手
export const setSinger = (params) => post('singer/add',params);

//修改歌手
export const updateSinger = (params) => post('singer/update',params);

//删除一个歌手
export const delSinger = (id) => get(`singer/delete?id=${id}`);

/*--------------歌曲相关------------------*/
//通过歌手id查询歌曲
export const songBySingerId = (id) => get(`song/singer/detail?singerId=${id}`)

//修改歌曲
export const updateSong = (params) => post('song/update',params);

//删除歌曲
export const delSong = (id) => get(`song/delete?id=${id}`)

//通过歌曲id查询歌曲对象
export const songOfSongId = (id) => get(`song/songOfSongId?songId=${id}`)

//通过歌曲名查询歌曲对象
export const songOfSongName = (songName) => get(`song/songOfSongName?songName=${songName}`)

//查询所有的歌曲
export const getAllSong = () => get('song/allSong')

/*------------------歌单相关---------------------*/
//查询歌单
export const getAllSongList = () => get('songList/allSongList');

//添加歌单
export const setSongList = (params) => post('songList/add',params);

//修改歌单
export const updateSongList = (params) => post('songList/update',params);

//删除一个歌单
export const delSongList = (id) => get(`songList/delete?id=${id}`);

/*----------------------歌单的歌曲相关----------------------*/
//根据歌单id查询歌曲列表
export const listSongDetail = (songListId) => get(`listSong/detail?songListId=${songListId}`)

//给歌单增加歌曲
export const addSong = (params) => post(`listSong/add`,params)

//删除歌单歌曲
export const delListSong = (songId,songListId) => get(`listSong/delete?songId=${songId}&songListId=${songListId}`)

/*--------------用户相关------------------*/
//查询用户
export const getAllConsumer = () => get('consumer/allConsumer');

//添加用户
export const setConsumer = (params) => post('consumer/add',params);

//修改用户
export const updateConsumer = (params) => post('consumer/update',params);

//删除一个用户
export const delConsumer = (id) => get(`consumer/delete?id=${id}`);

//根据用户id查询详细信息
export const getUserOfId = (id) => get(`consumer/selectById?id=${id}`)

/*--------------收藏------------------*/
//删除收藏
export const deleteCollect = (userId,songId) => get(`collect/delCollect?userId=${userId}&songId=${songId}`)

//指定用户的收藏列表
export const getCollectOfUserId = (userId) => get(`collect/collectOfUserId?userId=${userId}`)

/*--------------评论------------------*/
//指定歌单的评论列表
export const getCommentOfSongListId = (songListId) => get(`comment/commentOfSongListId?songListId=${songListId}`)

//删除评论
export const delComment = (id) => get(`comment/delete?id=${id}`)

