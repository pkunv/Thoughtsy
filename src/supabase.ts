export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      postLikes: {
        Row: {
          createdAt: string
          id: number
          postId: number
          uid: string | null
        }
        Insert: {
          createdAt?: string
          id?: number
          postId: number
          uid?: string | null
        }
        Update: {
          createdAt?: string
          id?: number
          postId?: number
          uid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "postLikes_postId_fkey"
            columns: ["postId"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          }
        ]
      }
      posts: {
        Row: {
          active: boolean | null
          content: string | null
          createdAt: string
          id: number
          source: string | null
          type: string | null
          uid: string | null
        }
        Insert: {
          active?: boolean | null
          content?: string | null
          createdAt?: string
          id?: number
          source?: string | null
          type?: string | null
          uid?: string | null
        }
        Update: {
          active?: boolean | null
          content?: string | null
          createdAt?: string
          id?: number
          source?: string | null
          type?: string | null
          uid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["uid"]
          }
        ]
      }
      users: {
        Row: {
          createdAt: string | null
          displayName: string | null
          uid: string
        }
        Insert: {
          createdAt?: string | null
          displayName?: string | null
          uid: string
        }
        Update: {
          createdAt?: string | null
          displayName?: string | null
          uid?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
