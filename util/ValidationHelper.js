import { GETTING_STARTED_TASKS } from '../constant';

export const ValidationHelper = {
  checkAddressValid(addr) {
    return addr.length === 42 && addr.substr(0, 2) === '0x';
  },
  filterUserData(u) {
    const {
      user,
      bonusCooldown,
      displayName,
      avatar,
      wallet,
      referrer,
      isEmailVerified,
      isEmailEnabled,
      email,
    } = u;
    return {
      user,
      bonusCooldown: bonusCooldown > Date.now() ? bonusCooldown : undefined,
      displayName,
      email,
      avatar,
      wallet,
      referrer: !!referrer,
      isEmailVerified,
      isEmailEnabled,
    };
  },
  filterUserDataMin({
    user,
    displayName,
    avatar,
    wallet,
  }) {
    return {
      user,
      displayName,
      avatar,
      wallet,
    };
  },
  filterTxData({
    from,
    fromId,
    to,
    toId,
    value,
    status,
    type,
    remarks,
    httpReferrer,
    completeTs,
    ts,
  }) {
    return {
      from,
      fromId,
      to,
      toId,
      value,
      status,
      type,
      remarks,
      httpReferrer,
      completeTs,
      ts,
    };
  },
  filterMissionData(m) {
    const {
      id,
      reward,
      refereeReward,
      refereeExtraReward,
      referralReward,
      referralPayoutType,
      targetPayoutType,
      done,
      seen,
      status,
      bonusId,
      isProxy,
      upcoming,
      endTs,
      isDesktopOnly,
      isMobileOnly,
      hide,
      staying,
    } = m;
    const misc = {};
    GETTING_STARTED_TASKS.forEach((task) => {
      if (m[task]) misc[task] = m[task];
    });
    const isHidable = m.isHidable || (m.isHidableAfterDone && m.done);
    return {
      id,
      reward,
      refereeReward,
      refereeExtraReward,
      referralReward,
      referralPayoutType,
      targetPayoutType,
      done,
      seen,
      status,
      isProxy,
      isClaimed: !!bonusId,
      upcoming,
      endTs,
      isDesktopOnly,
      isMobileOnly,
      isHidable,
      hide,
      staying,
      ...misc,
    };
  },
  filterPayoutData({
    id,
    type,
    referrer,
    referee,
    waitForClaim,
    value,
  }) {
    return {
      id,
      type,
      referrer,
      referee,
      waitForClaim,
      value,
    };
  },
  filterSocialPlatformPersonal({
    userId,
    pages,
  }) {
    const data = { id: userId };
    if (pages) data.pages = pages;
    return data;
  },
  filterSocialPlatformPublic({
    displayName,
    url,
  }) {
    return {
      displayName,
      url,
    };
  },
};

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

export default ValidationHelper;
