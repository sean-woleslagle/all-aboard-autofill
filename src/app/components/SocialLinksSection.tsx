import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { 
  Linkedin, 
  Twitter, 
  Globe, 
  Github, 
  Instagram, 
  Facebook, 
  Youtube,
  Code,
  BookOpen,
  Pen,
  Newspaper,
  Cloud
} from 'lucide-react';
import { UserData } from '@/app/App';

interface SocialLinksSectionProps {
  userData: UserData;
  updateUserData: (field: keyof UserData, value: any) => void;
}

export function SocialLinksSection({ userData, updateUserData }: SocialLinksSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Links</CardTitle>
        <CardDescription>Your professional and social online presence</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Professional Platforms */}
        <div className="space-y-4">
          <h3 className="font-medium text-sm text-gray-700">Professional Platforms</h3>
          
          <div className="space-y-2">
            <Label htmlFor="linkedin" className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </Label>
            <Input
              id="linkedin"
              placeholder="https://www.linkedin.com/in/johndoe"
              value={userData.linkedin}
              onChange={(e) => updateUserData('linkedin', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="github" className="flex items-center gap-2">
              <Github className="w-4 h-4" />
              GitHub
            </Label>
            <Input
              id="github"
              placeholder="https://github.com/johndoe"
              value={userData.github}
              onChange={(e) => updateUserData('github', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gitlab" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              GitLab
            </Label>
            <Input
              id="gitlab"
              placeholder="https://gitlab.com/johndoe"
              value={userData.gitlab}
              onChange={(e) => updateUserData('gitlab', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bitbucket" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Bitbucket
            </Label>
            <Input
              id="bitbucket"
              placeholder="https://bitbucket.org/johndoe"
              value={userData.bitbucket}
              onChange={(e) => updateUserData('bitbucket', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="leetcode" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              LeetCode
            </Label>
            <Input
              id="leetcode"
              placeholder="https://leetcode.com/johndoe"
              value={userData.leetcode}
              onChange={(e) => updateUserData('leetcode', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="replit" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Replit
            </Label>
            <Input
              id="replit"
              placeholder="https://replit.com/@johndoe"
              value={userData.replit}
              onChange={(e) => updateUserData('replit', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="artstation" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              ArtStation
            </Label>
            <Input
              id="artstation"
              placeholder="https://www.artstation.com/johndoe"
              value={userData.artstation}
              onChange={(e) => updateUserData('artstation', e.target.value)}
            />
          </div>
        </div>

        {/* Social Media Platforms */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="font-medium text-sm text-gray-700">Social Media</h3>
          
          <div className="space-y-2">
            <Label htmlFor="twitter" className="flex items-center gap-2">
              <Twitter className="w-4 h-4" />
              X (Twitter)
            </Label>
            <Input
              id="twitter"
              placeholder="https://twitter.com/johndoe"
              value={userData.twitter}
              onChange={(e) => updateUserData('twitter', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bluesky" className="flex items-center gap-2">
              <Cloud className="w-4 h-4" />
              Bluesky
            </Label>
            <Input
              id="bluesky"
              placeholder="https://bsky.app/profile/johndoe.bsky.social"
              value={userData.bluesky}
              onChange={(e) => updateUserData('bluesky', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="threads" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Threads
            </Label>
            <Input
              id="threads"
              placeholder="https://www.threads.net/@johndoe"
              value={userData.threads}
              onChange={(e) => updateUserData('threads', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mastodon" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Mastodon
            </Label>
            <Input
              id="mastodon"
              placeholder="https://mastodon.social/@johndoe"
              value={userData.mastodon}
              onChange={(e) => updateUserData('mastodon', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram" className="flex items-center gap-2">
              <Instagram className="w-4 h-4" />
              Instagram
            </Label>
            <Input
              id="instagram"
              placeholder="https://www.instagram.com/johndoe"
              value={userData.instagram}
              onChange={(e) => updateUserData('instagram', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="facebook" className="flex items-center gap-2">
              <Facebook className="w-4 h-4" />
              Facebook
            </Label>
            <Input
              id="facebook"
              placeholder="https://www.facebook.com/johndoe"
              value={userData.facebook}
              onChange={(e) => updateUserData('facebook', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tiktok" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              TikTok
            </Label>
            <Input
              id="tiktok"
              placeholder="https://www.tiktok.com/@johndoe"
              value={userData.tiktok}
              onChange={(e) => updateUserData('tiktok', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="youtube" className="flex items-center gap-2">
              <Youtube className="w-4 h-4" />
              YouTube
            </Label>
            <Input
              id="youtube"
              placeholder="https://www.youtube.com/@johndoe"
              value={userData.youtube}
              onChange={(e) => updateUserData('youtube', e.target.value)}
            />
          </div>
        </div>

        {/* Content & Writing Platforms */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="font-medium text-sm text-gray-700">Content & Writing</h3>
          
          <div className="space-y-2">
            <Label htmlFor="medium" className="flex items-center gap-2">
              <Pen className="w-4 h-4" />
              Medium
            </Label>
            <Input
              id="medium"
              placeholder="https://medium.com/@johndoe"
              value={userData.medium}
              onChange={(e) => updateUserData('medium', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="substack" className="flex items-center gap-2">
              <Newspaper className="w-4 h-4" />
              Substack
            </Label>
            <Input
              id="substack"
              placeholder="https://johndoe.substack.com"
              value={userData.substack}
              onChange={(e) => updateUserData('substack', e.target.value)}
            />
          </div>
        </div>

        {/* Personal Website */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="font-medium text-sm text-gray-700">Personal</h3>
          
          <div className="space-y-2">
            <Label htmlFor="website" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Personal Website / Portfolio
            </Label>
            <Input
              id="website"
              placeholder="https://www.johndoe.com"
              value={userData.website}
              onChange={(e) => updateUserData('website', e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
