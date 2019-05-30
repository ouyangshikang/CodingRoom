
/**
 * 用户头像
 */
interface Avatar {
    cdnUrl: string;
    filePath: string;
    fileSize: string;
}
/**
 * 用户描述
 */
interface UserProfile {
    cuid?: string;
    avatar?: Avatar;
    name: string;
    gender: string;
    age: string;
}
/**
 * 用户方法
 */
interface UserModel {
    createUser(profile: UserProfile): string; // 创建用户
    getUser(cuid: string): UserProfile; // 根据 cuid 获取用户
    listFollowers(cuid: string): UserProfile[]; // 获取所有关注者
    followByCuid(cuid: string, who: string): string; // 关注某人
}

class UserModelImpl implements UserModel {
    createUser(profile: UserProfile): string {
        return profile.name;
    }
    // ....
}
