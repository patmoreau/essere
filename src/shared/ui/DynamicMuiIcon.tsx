import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import AirIcon from '@mui/icons-material/Air';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FlareIcon from '@mui/icons-material/Flare';
import GrainIcon from '@mui/icons-material/Grain';
import HealingIcon from '@mui/icons-material/Healing';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LightModeIcon from '@mui/icons-material/LightMode';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import NightlightIcon from '@mui/icons-material/Nightlight';
import ParkIcon from '@mui/icons-material/Park';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import SpaIcon from '@mui/icons-material/Spa';
import StarsIcon from '@mui/icons-material/Stars';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import type { SvgIconProps } from '@mui/material';
import type { ComponentType } from 'react';

const REGISTRY: Record<string, ComponentType<SvgIconProps>> = {
  AccessibilityNew: AccessibilityNewIcon,
  Air: AirIcon,
  AutoAwesome: AutoAwesomeIcon,
  DirectionsRun: DirectionsRunIcon,
  FavoriteBorder: FavoriteBorderIcon,
  FitnessCenter: FitnessCenterIcon,
  Flare: FlareIcon,
  Grain: GrainIcon,
  Healing: HealingIcon,
  HealthAndSafety: HealthAndSafetyIcon,
  LightMode: LightModeIcon,
  LocalFlorist: LocalFloristIcon,
  NaturePeople: NaturePeopleIcon,
  Nightlight: NightlightIcon,
  Park: ParkIcon,
  Psychology: PsychologyIcon,
  SelfImprovement: SelfImprovementIcon,
  Spa: SpaIcon,
  Stars: StarsIcon,
  WbSunny: WbSunnyIcon,
};

const toPascalCase = (name: string) =>
  name
    .split('_')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');

type Props = SvgIconProps & { name: string };

const DynamicMuiIcon = ({ name, ...props }: Props) => {
  const Icon = REGISTRY[name] ?? REGISTRY[toPascalCase(name)];
  return Icon ? <Icon {...props} /> : null;
};

export default DynamicMuiIcon;
