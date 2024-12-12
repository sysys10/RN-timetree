
import React from 'react';
import {
    Hour24,
    RightArrowSVG,
    LocationSVG,
    UserSVG,
    LockSVG,
    PencilSVG,
    DescSVG,
    RepeateSVG,
    CategorySVG,
} from '@/assets';

export type IconName =
    | 'hour24'
    | 'rightArrow'
    | 'location'
    | 'user'
    | 'lock'
    | 'pencil'
    | 'desc'
    | 'repeat'
    | 'category';

interface IconProps {
    name: IconName;
    size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24 }) => {
    const icons = {
        hour24: Hour24,
        rightArrow: RightArrowSVG,
        location: LocationSVG,
        user: UserSVG,
        lock: LockSVG,
        pencil: PencilSVG,
        desc: DescSVG,
        repeat: RepeateSVG,
        category: CategorySVG,
    };

    const IconComponent = icons[name];
    return <IconComponent width={size} height={size} />;
};
