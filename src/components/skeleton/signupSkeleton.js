// SignUpSkeleton.jsx
import SkeletonField from "./skeletoonfield";

const SignUpSkeleton = () => (
  <div className="bg-white p-8 rounded-lg shadow-lg w-96 mx-auto">
    <div className="flex flex-col space-y-4">
      {/* Title Skeleton */}
      <SkeletonField className="w-24 h-8 mx-auto" />

      <form className="space-y-4">
        {/* Username Field Skeleton */}
        <SkeletonField className="w-full" />
        
        {/* Email Field Skeleton */}
        <SkeletonField className="w-full" />
        
        {/* Address Field Skeleton */}
        <SkeletonField className="w-full" />
        
        {/* Password Field Skeleton */}
        <SkeletonField className="w-full" />
        
        {/* Submit Button Skeleton */}
        <SkeletonField className="w-full h-12" />
        
        {/* Redirect to Login Text Skeleton */}
        <SkeletonField className="w-32 h-4 mx-auto" />
      </form>
    </div>
  </div>
);

export default SignUpSkeleton;
