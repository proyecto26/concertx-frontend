import { useWallet } from '@solana/wallet-adapter-react';
import { json, type ActionFunctionArgs } from '@remix-run/node';
import { Profanity } from '@2toad/profanity';

import Layout from '~/components/Layout';
import ProfilePage from '~/pages/Profile';
import { supabase } from '~/utils/supabase';
import type { ProfileFormData } from '~/models';
import { csrf } from '~/cookies/session.server';
import { getAuthSession } from '~/cookies/auth.server';

const profanity = new Profanity();

// Validation helper
const validateContent = (field: string, value: string | null) => {
  if (!value) return `${field} is required`;
  if (profanity.exists(value)) return `${field} contains inappropriate content`;
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.clone().formData();
  await csrf.validate(formData, request.headers);

  const { getPublicKey } = await getAuthSession(request);
  const walletAddress = getPublicKey();
  if (!walletAddress) {
    return json({ ok: false, error: 'Wallet address is required' });
  }

  try {
    // Get form data
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const displayName = formData.get('display_name') as string;
    const bio = formData.get('bio') as string;
    const avatarUrl = formData.get('avatar_url') as string;

    // Validate required fields
    const usernameError = validateContent('Username', username);
    if (usernameError) return json({ ok: false, error: usernameError });

    const displayNameError = validateContent('Display name', displayName);
    if (displayNameError) return json({ ok: false, error: displayNameError });

    const emailError = validateContent('Email', email);
    if (emailError) return json({ ok: false, error: emailError });

    // Validate bio only if provided
    if (bio && bio.trim()) {
      const bioError = validateContent('Bio', bio);
      if (bioError) return json({ ok: false, error: bioError });
    }

    // Validate username format (alphanumeric and underscore only)
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return json({ 
        ok: false, 
        error: 'Username can only contain letters, numbers, and underscores' 
      });
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ ok: false, error: 'Invalid email format' });
    }

    const profileData: ProfileFormData = {
      username,
      email,
      display_name: displayName,
      bio: bio || undefined,
      avatar_url: avatarUrl || undefined,
    };

    const { error: updateError } = await supabase
      .from('users')
      .upsert({
        solana_wallet_address: walletAddress,
        ...profileData,
        role: 'user',
        updated_at: new Date().toISOString(),
      });

    if (updateError) {
      // Handle specific database errors
      if (updateError.code === '23505') { // Unique violation
        if (updateError.message.includes('username')) {
          return json({ ok: false, error: 'Username is already taken' });
        }
        if (updateError.message.includes('email')) {
          return json({ ok: false, error: 'Email is already registered' });
        }
      }
      throw updateError;
    }

    return json({ ok: true });
  } catch (error) {
    console.error('Error updating profile:', error);
    return json({ 
      ok: false, 
      error: error instanceof Error ? error.message : 'Failed to update profile' 
    });
  }
};

export default function Index() {
  const { publicKey } = useWallet();
  return (
    <Layout>
      <ProfilePage address={publicKey?.toBase58()} />
    </Layout>
  );
} 