import {nanoid} from 'nanoid'
const MaterialType = {
    image: 'image',
    audio: 'audio',
    video: 'video',
};
const arrayHasContent = (array) => Array.isArray(array) && array.length > 0;
const keyBy = (items, key = 'id', keepItemReference = false) => {
    let result = {};
    if (!Array.isArray(items) || items.length == 0) {
        return result;
    }
    items.forEach((item) => {
        result[item[key]] = keepItemReference ? item : { ...item };
    });
    return result;
};
const RightChoiceTag = '【正确】';
const TagSteps = '【步骤】';
const TagID = '【ID】';
export const TagSubTitle = '【小标题】';
export const TagVideoCut = '【视频素材剪辑】';
export const TagVideoSort = '【视频素材排序】';
export const TagTakeVideoTui = '【拍视频-p推】';
export const TagTakeVideoLa = '【拍视频-拉】';
export const TagTakeVideoYao = '【拍视频-摇】';
export const TagTakeVideoYi = '【拍视频-移】';
export const TagTakeVideoShuai = '【拍视频-甩】';
export const TagTakeVideoGen = '【拍视频-跟】';
export const TagTakeVideoSheng = '【拍视频-升】';
export const TagTakeVideoJiang = '【拍视频-降】';
export const TagTakeVideoGuding = '【拍视频-固定】';
export const TagVideoAddAudio = '【视频素材-录音】';
export const TagVideoAddMusic = '【视频素材-音乐】';
const RegexHasTag = /\S*【\S+】\S*/;
const ChoiceStart = '- ';
export const IMType = {
    singleChoice: 'singleChoice',
    steps: 'steps',
    subTitle: 'subTitle',
    videoCut: 'videoCut',
    videoSort: 'videoSort',
    videoAddAudio: 'videoAddAudio',
    videoAddMusic: 'videoAddMusic',
    takeVideoTLYY: 'takeVideoTLYY',
};
/**
 * 将text按tag拆分成数组
 */
const parseContent = (content, list = []) => {
    if (!content) {
        return list;
    }
    const tagIndexList = Tags.map(({ tag, type }) => ({
        tag,
        type,
        index: content.indexOf('【' + tag),
    }));
    tagIndexList.sort((a, b) => {
        if (a.index == -1 && b.index != -1) {
            return 1;
        } else if (a.index == -1 && b.index != -1) {
            return -1;
        }
        return a.index - b.index;
    });
    for (let i = 0; i < tagIndexList.length; i++) {
        const { index, tag, type } = tagIndexList[i];
        if (index == -1) {
            continue;
        }
        // 】
        const startEndIndex = content.indexOf('】', index + tag.length + 1);
        // 【结尾】
        const nextIndex = content.indexOf('【' + tag + '】', startEndIndex);
        if (startEndIndex >= 0 && nextIndex >= 0) {
            if (index > 0) {
                list.push({
                    type: 'normal',
                    content: content.slice(0, index),
                });
            }
            const subContent = content.slice(startEndIndex + 1, nextIndex);
            const tagPropsStr = content
                .slice(index + tag.length + 1, startEndIndex)
                .split(' ')
                .filter((item) => !!item)
                .map((item) => {
                    const splitIndex = item.indexOf('=');
                    return {
                        name: splitIndex > 0 ? item.slice(0, splitIndex) : item,
                        value:
                            splitIndex > 0 ? item.slice(splitIndex + 1) : true,
                    };
                });
            if (subContent) {
                list.push({
                    type,
                    content: subContent,
                    tagProps: tagPropsStr,
                });
            }
            return parseContent(
                content.slice(nextIndex + tag.length + 2),
                list
            );
        }
    }
    return [
        ...list,
        {
            type: 'normal',
            content,
        },
    ];
};
const getIdAndContentArrayFromText = (text) => {
    const list = parseContent(text);
    const contentArray = [];
    const ids = [];
    list.forEach((item) => {
        if (item.type == 'ID') {
            ids.push(item);
        } else {
            contentArray.push(item);
        }
    });
    return {
        id: ids[0]?.content,
        contentArray,
    };
};
const TagToIMTypeMap = {
    [TagSubTitle]: IMType.subTitle,
    [TagSteps]: IMType.steps,
    [TagVideoCut]: IMType.videoCut,
    [TagVideoSort]: IMType.videoSort,
    [TagVideoAddAudio]: IMType.videoAddAudio,
    [TagVideoAddMusic]: IMType.videoAddMusic,
};
const convertContentArrayToRawContent = (contentArray) => {
    const tagsMap = keyBy(Tags, 'type');
    return contentArray.map(({ content, type }) => {
        if (tagsMap[type]) {
            return tagsMap[type].tag + content + tagsMap[type].tag;
        }
        return content;
    });
};
export const  getDotFromRawText = (text, resources) => {
    const items = text
        .trim()
        .split(/[\n\n]{2,}/)
        .filter((item) => !!item);
    const result = [];
    // let lastRole = '';
    items.forEach((item) => {
        let node = {};
        let roleIndex = item.startsWith('【') ? -1 : item.indexOf('：');
        if (roleIndex > 10) {
            roleIndex = -1;
        }
        node.role = roleIndex >= 0 ? item.slice(0, roleIndex) : '';
        // lastRole = node.role;
        const textItems = item.split('\n').filter((item) => !!item);
        const selectIndex = textItems.findIndex(
            (i) => i.startsWith('1.') || i.startsWith(ChoiceStart)
        );
        node.content = textItems
            .slice(0, selectIndex >= 0 ? selectIndex : textItems.length + 1)
            .join('\n')
            .slice(roleIndex >= 0 ? roleIndex + 1 : 0);
        const specialTag = Object.keys(TagToIMTypeMap).find((item) =>
            node.content.startsWith(item)
        );
        if (specialTag) {
            node.imType = TagToIMTypeMap[specialTag];
            node.content = node.content.slice(specialTag.length);
        } else if (
            [
                TagTakeVideoTui,
                TagTakeVideoLa,
                TagTakeVideoYao,
                TagTakeVideoYi,
                TagTakeVideoShuai,
                TagTakeVideoGen,
                TagTakeVideoSheng,
                TagTakeVideoJiang,
                TagTakeVideoGuding,
            ].some((item) => node.content.startsWith(item))
        ) {
            node.imType = IMType.takeVideoTLYY;
        }
        if (selectIndex >= 0) {
            let choices = [];
            textItems.slice(selectIndex).forEach((item) => {
                if (/^[0-9]\./.test(item)) {
                    choices.push({
                        content: item.slice(item.indexOf('.') + 1),
                        hintList: [],
                    });
                } else if (item.startsWith(ChoiceStart)) {
                    choices.push({
                        content: item.slice(ChoiceStart.length),
                        hintList: [],
                    });
                } else {
                    choices[choices.length - 1].hintList.push(item);
                }
            });
            choices.forEach((item) => {
                if (item.hintList.length > 0) {
                    item.hint = item.hintList.join('\n');
                }
                delete item.hintList;
                if (item.content.endsWith(RightChoiceTag)) {
                    item.right = true;
                    item.content = item.content.slice(
                        0,
                        -RightChoiceTag.length
                    );
                }
            });

            if (choices.length > 0) {
                if (!node.imType) {
                    node.imType = IMType.singleChoice;
                    // 错误解释可以继承
                    choices.forEach((item, index) => {
                        const { hint, right } = item;
                        if (!hint) {
                            const hintArray = [
                                ...choices.slice(0, index).reverse(),
                                ...choices.slice(index + 1),
                            ];
                            let closestRight = hintArray.find(
                                (item) => item.hint && item.right
                            )?.hint;
                            let closestWrong = hintArray.find(
                                (item) => item.hint && !item.right
                            )?.hint;
                            if (right) {
                                item.hint = closestRight || closestWrong;
                            } else {
                                item.hint = closestWrong || closestRight;
                            }
                            item.hintFake = true;
                        }
                    });
                }
                node.choices = choices;
            }
        }
        result.push(node);
    });
    const resourcesMap = keyBy(resources, 'id');
    result.forEach((item, index) => {
        const { id, contentArray } = getIdAndContentArrayFromText(item.content);
        item.id = id || nanoid();
        item.contentArray = contentArray;
        if (item.choices) {
            item.choices.forEach((item, i) => {
                const { id, contentArray } = getIdAndContentArrayFromText(
                    item.content
                );
                item.id = id || nanoid();
                item.contentArray = contentArray;
                item.hintContentArray = getIdAndContentArrayFromText(
                    item.hint
                ).contentArray;
            });
        }
        item.contentArray.forEach((subItem) => {
            if (isMaterialType(subItem.type)) {
                subItem.material = resourcesMap[subItem.content];
            }
        });
    });
    return {
        content: 'test',
        edges: result,
    };
};

module.exports.convertDotToRawText = (dot) => {
    return dot.edges
        .map(({ id, role, content, choices, imType }) => {
            let text = content;
            const specialTag = Object.keys(TagToIMTypeMap).find(
                (item) => TagToIMTypeMap[item] == imType
            );
            if (specialTag) {
                text = specialTag + text;
            }
            if (
                [
                    IMType.singleChoice,
                    IMType.takeVideoTLYY,
                    IMType.videoCut,
                    IMType.videoSort,
                    IMType.videoAddAudio,
                    IMType.videoAddMusic,
                ].some((item) => item == imType) &&
                !content.includes(id)
            ) {
                text += `${TagID}${id}${TagID}`;
            }
            if (
                [IMType.singleChoice, IMType.steps].some(
                    (item) => item == imType
                ) &&
                arrayHasContent(choices)
            ) {
                text +=
                    '\n' +
                    choices
                        .map(
                            ({
                                 id,
                                 content,
                                 contentArray,
                                 hint,
                                 hintFake,
                                 right,
                             }) => {
                                return (
                                    ChoiceStart +
                                    (contentArray
                                        ? convertContentArrayToRawContent(
                                            contentArray
                                        )
                                        : content) +
                                    (imType == IMType.singleChoice
                                        ? `${TagID}${id}${TagID}`
                                        : '') +
                                    (right ? RightChoiceTag : '') +
                                    (hint && !hintFake ? '\n' + hint : '')
                                );
                            }
                        )
                        .join('\n');
            }
            return (role ? role + '：' : '') + text;
        })
        .join('\n\n');
};
export const  Tags = [
    { tag: 'ID', type: 'ID' },
    { tag: '粗', type: 'bold' }, // 加粗
    { tag: '斜', type: 'italic' }, // 斜体
    { tag: '文本样式', type: 'textStyle' },
    { tag: '图片', type: MaterialType.image },
    { tag: '音频', type: MaterialType.audio },
    { tag: '视频', type: MaterialType.video },
];
export const  isMaterialType = (type) =>
    [MaterialType.image, MaterialType.audio, MaterialType.video].some(
        (item) => item == type
    );
export const TagUserName = '【用户名】';
const TagUserNameRegex = /【用户名】/g;
export const TagNewLine = '【换行】';
const TagNewLineRegex = /【换行】/g;
export const  formatContent = (content, {getUserName} = {}) => {
    const userName = (getUserName ? getUserName() : '') || '用户'
    return (content || '')
        .replace(
            TagUserNameRegex,
            userName
        )
        .replace(TagNewLineRegex, '\n');
};
